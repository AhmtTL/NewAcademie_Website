# NY Empire Academy Website

A modern, responsive educational platform built with React, TypeScript, and Tailwind CSS, featuring a production-ready Stripe integration for program enrollments.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Program Management**: Comprehensive educational program listings and details
- **Secure Authentication**: JWT-based authentication with protected routes
- **Shopping Cart**: Full-featured cart with persistent state
- **Payment Processing**: Production-ready Stripe integration with proper error handling
- **Global Presence**: Interactive world map showing academy locations
- **Testimonials**: Student reviews and success stories
- **University Partners**: Showcase of partner institutions

## 🛡️ Stripe Integration

This application features a **production-ready Stripe integration** with:

### Frontend Features
- ✅ Secure environment-based configuration
- ✅ Proper error handling and user feedback
- ✅ Payment verification flow
- ✅ Real-time payment status updates
- ✅ Professional checkout experience
- ✅ No hard-coded keys or mock backends

### Backend Integration
- ✅ Complete Laravel backend implementation (see `STRIPE_LARAVEL_BACKEND.md`)
- ✅ Webhook handling for payment events
- ✅ Order management and tracking
- ✅ Secure API endpoints
- ✅ Payment verification and confirmation

## 📚 Programs Offered

### Featured Programs
1. **Teacher Development Program** - $2,499 (8 weeks)
   - Professional certification
   - Interactive workshops
   - Real classroom experience

2. **NASA Space Training** - $3,999 (12 weeks)
   - "Seek Signs of Life" program
   - Space exploration
   - STEM skills development
   - Hands-on projects

3. **Cambridge Academic Training** - $1,999 (6 weeks)
   - Research training by Cambridge professors
   - Academic writing
   - Research methods

### Other Programs
- Academic Consulting ($999)
- Career Consulting ($799)
- One-on-One Mentorship ($1,299)
- Summer Schools ($1,599)
- SAT/ACT Crash Camps ($899)
- Project Olympiads ($2,199)
- Experiential Learning Programs ($1,799)
- Model United Nations ($1,299)
- Pre-College Programs ($3,499)

## 🌍 Global Presence

NY Empire Academy has locations in:
- New York, USA (Headquarters)
- London, UK
- Seoul, South Korea
- Baku, Azerbaijan
- Cyprus
- Lahore, Pakistan

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Laravel backend (see `STRIPE_LARAVEL_BACKEND.md`)

### Frontend Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd nyea-website
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the root directory:
```env
# Stripe Configuration (REQUIRED for checkout pages only)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# API Configuration
REACT_APP_API_BASE_URL=https://admin.nyempireacademy.com/api/v1

# Optional Configuration
REACT_APP_CURRENCY=usd
REACT_APP_STRIPE_WEBHOOK_ENDPOINT=/webhooks/stripe
```

4. **Start the development server:**
```bash
npm start
```

5. **Open [http://localhost:3000](http://localhost:3000) to view it in the browser.**

### Backend Setup

For the complete Laravel backend implementation, see the comprehensive guide in `STRIPE_LARAVEL_BACKEND.md`.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── home/           # Home page components
│   ├── about/          # About page components
│   ├── nasa/           # NASA program components
│   └── ui/             # Shared UI components
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── About.tsx       # About page
│   ├── Programs.tsx    # Program listing
│   ├── Cart.tsx        # Shopping cart
│   ├── Checkout.tsx    # Payment processing
│   ├── Success.tsx     # Payment success page
│   ├── Contact.tsx     # Contact form
│   ├── ExecutiveCertificates.tsx  # Executive Certificate Series landing (lead-gen)
│   ├── ExecutiveCertificatesWorkshop.tsx  # Workshop detail page
│   ├── SignIn.tsx      # User login
│   ├── SignUp.tsx      # User registration
│   └── Dashboard.tsx   # User dashboard
├── services/           # API and external services
│   ├── api.ts          # Centralized API client
│   ├── stripe.ts       # Stripe integration
│   └── auth.ts         # Authentication service
├── context/            # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── CartContext.tsx # Shopping cart state
├── types/              # TypeScript definitions
│   ├── cart.ts         # Cart-related types
│   └── stripe.ts       # Stripe-related types
├── config/             # Configuration files
│   └── stripe.ts       # Stripe configuration
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Main app component
├── index.tsx           # App entry point
└── index.css           # Global styles
```

## 🔧 Key Features Implementation

### Authentication System
- JWT-based authentication
- Role-based access control
- Persistent login sessions
- Protected routes with proper redirects

### Shopping Cart
- Add/remove programs with quantity management
- Real-time price calculations
- Persistent cart state using localStorage
- Cart validation and error handling

### Payment Integration
- **Secure Stripe checkout flow**
- **Environment-based configuration**
- **Real-time payment verification**
- **Comprehensive error handling**
- **Order confirmation and tracking**
- **Webhook support for payment events**

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interfaces
- Accessible design patterns

## 🎨 Customization

### Styling
The website uses Tailwind CSS with a custom color scheme:
- Primary: Blue tones (#2563eb)
- Secondary: Gray tones (#475569)
- Custom fonts: Inter

### Adding New Programs
1. Update the programs array in `src/pages/Programs.tsx`
2. Add new categories to the filter options
3. Create dedicated program pages if needed

### Payment Configuration
1. **Sign up for a Stripe account**
2. **Get your publishable and secret keys**
3. **Update environment variables**
4. **Configure webhooks for production**
5. **Set up Laravel backend (see `STRIPE_LARAVEL_BACKEND.md`)**

## 🚀 Deployment

### Frontend Deployment

#### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `REACT_APP_STRIPE_PUBLISHABLE_KEY`
   - `REACT_APP_API_BASE_URL`
3. Deploy automatically on push to main branch

#### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Configure environment variables in Netlify dashboard

#### Traditional Hosting
1. Build the project: `npm run build`
2. Upload the `build` folder to your web server
3. Configure your server to serve the React app

### Backend Deployment
See `STRIPE_LARAVEL_BACKEND.md` for complete Laravel deployment instructions.

## 🔐 Security Features

### Stripe Integration Security
- No hard-coded API keys
- Environment-based configuration validation
- Proper error handling without exposing sensitive data
- Webhook signature verification
- Order verification and tracking

### Authentication Security
- JWT token management
- Secure password handling
- Protected route implementation
- Automatic token refresh

### Data Protection
- Input validation and sanitization
- HTTPS enforcement in production
- Secure error handling
- No sensitive data in client-side code

## 🐛 Troubleshooting

### Common Issues

1. **Stripe Configuration Error**
   - Ensure `REACT_APP_STRIPE_PUBLISHABLE_KEY` is set
   - Verify key format (should start with `pk_`)
   - Don't use test keys in production

2. **Payment Verification Failed**
   - Check backend API connectivity
   - Verify webhook configuration
   - Check Laravel logs for errors

3. **Build Errors**
   - Clear node_modules and package-lock.json
   - Run `npm install` again
   - Check for TypeScript errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions about the Stripe integration or any other features:

- 📧 Email: support@nyea.com
- 📱 Phone: +1 (555) 123-4567
- 🌐 Website: [https://nyea.com](https://nyea.com)

## 🔄 Version History

### v2.0.0 (Current)
- ✅ Production-ready Stripe integration
- ✅ Removed mock backend
- ✅ Added comprehensive error handling
- ✅ Implemented payment verification flow
- ✅ Added Laravel backend documentation

### v1.0.0
- Initial release with basic features
- Mock Stripe integration
- Basic cart functionality 