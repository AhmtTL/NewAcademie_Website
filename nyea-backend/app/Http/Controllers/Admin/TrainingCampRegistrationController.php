<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UserTrainingCampRegistration;
use App\Models\TrainingCampSession;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TrainingCampRegistrationController extends Controller
{
    /**
     * Display a listing of training camp registrations.
     */
    public function index(Request $request)
    {
        $query = UserTrainingCampRegistration::with([
            'user',
            'program',
            'trainingCampSession',
            'payment'
        ]);

        // Search by registration code
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('unique_code', 'like', "%{$search}%")
                    ->orWhere('guest_name', 'like', "%{$search}%")
                    ->orWhere('guest_email', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    })
                    ->orWhereHas('program', function ($programQuery) use ($search) {
                        $programQuery->where('title', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by check-in status
        if ($request->filled('status')) {
            $isCheckedIn = $request->get('status') === 'checked_in';
            $query->where('is_checked_in', $isCheckedIn);
        }

        $registrations = $query->latest()
            ->paginate(20);

        // Get all training camp sessions for filtering
        $trainingCampSessions = TrainingCampSession::with('program:id,title')
            ->orderBy('date', 'desc')
            ->get()
            ->map(fn($session) => [
                'id' => $session->id,
                'title' => $session->program->title . ' - ' . $session->date->format('M d, Y') . ' - ' . $session->location,
            ]);

        return Inertia::render('Admin/TrainingCampRegistrations/Index', [
            'registrations' => $registrations,
            'filters' => $request->only(['search', 'status']),
            'trainingCampSessions' => $trainingCampSessions,
            'stats' => [
                'total_registrations' => UserTrainingCampRegistration::count(),
                'checked_in' => UserTrainingCampRegistration::where('is_checked_in', true)->count(),
                'pending_checkin' => UserTrainingCampRegistration::where('is_checked_in', false)->count(),
            ],
        ]);
    }

    /**
     * Mark a registration as checked in.
     */
    public function checkIn(UserTrainingCampRegistration $registration): RedirectResponse
    {
        if ($registration->is_checked_in) {
            return back()->with('error', 'Registration already checked in.');
        }

        $registration->checkIn();

        return back()->with('success', 'Registration checked in successfully.');
    }

    /**
     * Uncheck a registration.
     */
    public function uncheckIn(UserTrainingCampRegistration $registration): RedirectResponse
    {
        if (!$registration->is_checked_in) {
            return back()->with('error', 'Registration is not checked in.');
        }

        $registration->update([
            'is_checked_in' => false,
            'checked_in_at' => null,
        ]);

        return back()->with('success', 'Registration unchecked successfully.');
    }

    /**
     * Export training camp registrations data
     */
    public function export(Request $request)
    {
        $query = UserTrainingCampRegistration::with([
            'user',
            'program',
            'trainingCampSession',
            'payment'
        ]);

        // Apply filters
        if ($request->filled('status')) {
            $isCheckedIn = $request->get('status') === 'checked_in';
            $query->where('is_checked_in', $isCheckedIn);
        }

        if ($request->filled('training_camp_session_id')) {
            $query->where('training_camp_session_id', $request->get('training_camp_session_id'));
        }

        $registrations = $query->latest()->get();

        $csvData = "Registration Code,Name,Email,Phone,School,Grade,City,Program,Training Camp Session,Check-in Status,Checked In At,Registered At\n";

        foreach ($registrations as $registration) {
            $trainingCampInfo = '';
            if ($registration->trainingCampSession) {
                $trainingCampInfo = $registration->trainingCampSession->date->format('M d, Y') . ' - ' . $registration->trainingCampSession->location . ' - ' . $registration->trainingCampSession->time;
            }

            $csvData .= implode(',', [
                $registration->unique_code,
                '"' . ($registration->guest_name ?? $registration->user->name ?? '') . '"',
                $registration->guest_email ?? $registration->user->email ?? '',
                $registration->payment->guest_phone ?? '',
                '"' . ($registration->payment->guest_school_name ?? '') . '"',
                $registration->payment->guest_grade ?? '',
                $registration->payment->guest_city ?? '',
                '"' . ($registration->program->title ?? 'N/A') . '"',
                '"' . $trainingCampInfo . '"',
                $registration->is_checked_in ? 'Checked In' : 'Pending Check-in',
                $registration->checked_in_at ? $registration->checked_in_at->format('Y-m-d H:i:s') : '',
                $registration->created_at->format('Y-m-d H:i:s'),
            ]) . "\n";
        }

        return response($csvData)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="training-camp-registrations-' . now()->format('Y-m-d') . '.csv"');
    }
}
