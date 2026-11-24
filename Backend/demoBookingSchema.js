const { z } = require('zod');

const demoBookingSchema = z.object({

    // Topic validation
    topic: z.enum(['SAP', 'Automation / IA', 'General connect']),

    // Name validation
    name: z.string()
        .trim()
        .min(2, "Name must contain at least 2 characters")
        .max(120),

    // Designation validation
    designation: z.string()
        .trim()
        .min(1, "Designation is required")
        .max(120),

    // Company validation
    company: z.string()
        .trim()
        .min(1, "Company name is required")
        .max(160),

    // Industry validation
    industry: z.string()
        .trim()
        .min(1, "Industry is required")
        .max(60),

    // Email validation
    email: z.string()
        .trim()
        .max(254)
        .email("Please enter a valid email address"),

    // Phone validation
    phone: z.string()
        .trim()
        .regex(
            /^[0-9+\-\s()]{7,20}$/,
            "Please enter a valid phone number"
        ),

    // Preferred date validation
    preferredDate: z.string()
        .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            "Please enter date in YYYY-MM-DD format"
        ),

    // Preferred time validation
   preferredTime: z.string()
    .regex(
        /^([01]\d|2[0-3]):[0-5]\d$/,
        "Please enter time in HH:mm format"
    ),

description: z.string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters")
    .optional()
    .default(''),

hearAbout: z.string()
    .trim()
    .optional()
    .default(''),

hearAboutOther: z.string()
    .trim()
    .optional()
    .default('')
});

// Export schema
module.exports = demoBookingSchema;
