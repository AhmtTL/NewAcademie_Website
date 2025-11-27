<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Store a new contact form submission
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        // Rate limiting: Check if same email has submitted in last 5 minutes
        $recentSubmission = Contact::where('email', $request->email)
            ->where('created_at', '>', now()->subMinutes(5))
            ->first();

        if ($recentSubmission) {
            return response()->json([
                'success' => false,
                'message' => 'Please wait before submitting another message. You can submit one message every 5 minutes.'
            ], 429);
        }

        $contact = Contact::create([
            'fullname' => $request->fullname,
            'email' => $request->email,
            'phone' => $request->phone,
            'subject' => $request->subject,
            'message' => $request->message,
        ]);

        // You can add email notification here if needed
        // Mail::to('admin@nyea.test')->send(new ContactFormSubmitted($contact));

        return response()->json([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you soon.',
            'data' => [
                'contact' => [
                    'id' => $contact->id,
                    'fullname' => $contact->fullname,
                    'email' => $contact->email,
                    'phone' => $contact->phone,
                    'subject' => $contact->subject,
                    'message' => $contact->message,
                    'created_at' => $contact->created_at,
                ]
            ]
        ], 201);
    }
}
