import React from "react";
import { useNavigate } from "react-router-dom";

export const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition"
          >
            <span className="text-xl">←</span>
            <span>Back to Home</span>
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">
            Last Updated: November 5, 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Introduction
            </h2>
            <p className="mb-4">
              At InstaGem, we take the privacy of children very seriously. This
              Privacy Policy explains how we collect, use, and protect
              information from children aged 1-17 years old and their
              parents/guardians. We are committed to complying with the
              Children's Online Privacy Protection Act (COPPA) and other
              applicable privacy laws.
            </p>
            <div className="bg-blue-500/10 border border-blue-400 rounded-xl p-4">
              <p className="text-blue-300 font-semibold">
                🛡️ Your Child's Privacy is Our Priority
              </p>
              <p className="text-sm text-gray-400 mt-2">
                We only collect essential information needed to provide a safe,
                educational experience.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              A. From Children:
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
              <li>
                <strong>Child's Name:</strong> First name or nickname for
                personalization
              </li>
              <li>
                <strong>Age:</strong> To provide age-appropriate educational
                content (1-17 years)
              </li>
              <li>
                <strong>Username:</strong> For account identification
              </li>
              <li>
                <strong>Email:</strong> For account recovery and notifications
              </li>
              <li>
                <strong>Password:</strong> Encrypted and securely stored
              </li>
              <li>
                <strong>Favorite Color:</strong> For personalized interface
                themes
              </li>
              <li>
                <strong>Comments:</strong> Text comments posted on educational
                videos
              </li>
              <li>
                <strong>Likes:</strong> Videos your child has liked
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              B. From Parents/Guardians:
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
              <li>
                <strong>Parent Email:</strong> Required for children under 13
                (COPPA compliance)
              </li>
              <li>
                <strong>Consent:</strong> Verification of parental consent for
                children under 13
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              C. Automatically Collected:
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <strong>Usage Data:</strong> Which videos are watched, how long
                they're watched
              </li>
              <li>
                <strong>Device Information:</strong> Browser type, device type
                (for compatibility)
              </li>
              <li>
                <strong>IP Address:</strong> For security and preventing abuse
              </li>
              <li>
                <strong>Cookies:</strong> For authentication and maintaining
                login sessions
              </li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-3">
              We use collected information only for the following purposes:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <strong>Provide Educational Content:</strong> Show
                age-appropriate videos based on your child's age
              </li>
              <li>
                <strong>Account Management:</strong> Create and maintain user
                accounts
              </li>
              <li>
                <strong>Platform Improvement:</strong> Understand which
                educational content is most helpful
              </li>
              <li>
                <strong>Safety & Security:</strong> Prevent inappropriate
                behavior and protect users
              </li>
              <li>
                <strong>Parent Communication:</strong> Send activity updates to
                parent email (for under 13)
              </li>
              <li>
                <strong>Legal Compliance:</strong> Comply with COPPA and other
                legal requirements
              </li>
            </ul>
            <p className="mt-4 text-red-300 font-semibold">
              ⚠️ We NEVER sell, rent, or share your child's personal information
              with third parties for marketing purposes.
            </p>
          </section>

          {/* Data Storage */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. How We Store & Protect Data
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="text-purple-400">Database:</strong> All user
                data is stored in MongoDB Atlas, a secure cloud database with
                encryption at rest.
              </p>
              <p>
                <strong className="text-purple-400">Password Security:</strong>{" "}
                Passwords are hashed using bcrypt encryption and are never
                stored in plain text.
              </p>
              <p>
                <strong className="text-purple-400">Authentication:</strong> We
                use JWT (JSON Web Tokens) for secure authentication. Tokens are
                stored locally in your browser.
              </p>
              <p>
                <strong className="text-purple-400">Video Content:</strong> We
                do NOT store videos. All videos are embedded from YouTube and
                remain on YouTube's servers.
              </p>
              <p>
                <strong className="text-purple-400">
                  Third-Party Services:
                </strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong>MongoDB Atlas:</strong> Database hosting (encrypted,
                  secure)
                </li>
                <li>
                  <strong>Cloudinary:</strong> Profile image storage (if user
                  uploads avatar)
                </li>
                <li>
                  <strong>YouTube:</strong> Video embedding (subject to
                  YouTube's privacy policy)
                </li>
              </ul>
            </div>
          </section>

          {/* COPPA Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. COPPA Compliance (Children Under 13)
            </h2>
            <div className="bg-green-500/10 border border-green-400 rounded-xl p-6 space-y-3">
              <p className="text-green-300 font-semibold text-lg">
                🛡️ Special Protections for Young Children
              </p>
              <p>
                <strong className="text-purple-400">
                  Parental Consent Required:
                </strong>{" "}
                We require verifiable parental consent before collecting
                personal information from children under 13.
              </p>
              <p>
                <strong className="text-purple-400">
                  Parent Email Mandatory:
                </strong>{" "}
                A parent/guardian email must be provided during registration.
              </p>
              <p>
                <strong className="text-purple-400">Parent Rights:</strong>{" "}
                Parents have the right to:
              </p>
              <ul className="list-disc list-inside ml-6 space-y-2">
                <li>Review their child's personal information</li>
                <li>Request deletion of their child's information</li>
                <li>Refuse further collection of their child's information</li>
                <li>Receive activity summaries and educational tips</li>
              </ul>
              <p>
                <strong className="text-purple-400">
                  To Exercise Parent Rights:
                </strong>{" "}
                Email us at content@instagem.com with subject "Parent Request -
                [Child's Username]"
              </p>
            </div>
          </section>

          {/* Cookies & Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              6. Cookies & Tracking Technologies
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="text-purple-400">
                  Authentication Cookies:
                </strong>{" "}
                We use cookies to keep users logged in securely.
              </p>
              <p>
                <strong className="text-purple-400">Local Storage:</strong> JWT
                tokens are stored in browser's local storage for authentication.
              </p>
              <p>
                <strong className="text-purple-400">
                  No Third-Party Tracking:
                </strong>{" "}
                We do not use advertising cookies or third-party tracking
                pixels.
              </p>
              <p>
                <strong className="text-purple-400">YouTube Embeds:</strong>{" "}
                YouTube may set its own cookies when videos are played. See
                YouTube's privacy policy for details.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Data Retention
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="text-purple-400">Active Accounts:</strong> We
                retain account data as long as the account is active.
              </p>
              <p>
                <strong className="text-purple-400">Account Deletion:</strong>{" "}
                When you delete your account, we permanently delete all personal
                information within 30 days.
              </p>
              <p>
                <strong className="text-purple-400">Comments:</strong> Deleted
                accounts will have their comments anonymized (username removed).
              </p>
              <p>
                <strong className="text-purple-400">Inactive Accounts:</strong>{" "}
                Accounts inactive for 2+ years may be automatically deleted
                after notification.
              </p>
            </div>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              8. Third-Party Links & Embedded Content
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="text-purple-400">YouTube Videos:</strong> All
                videos are embedded from YouTube. When users watch videos, they
                are subject to YouTube's privacy policy.
              </p>
              <p>
                <strong className="text-purple-400">External Links:</strong>{" "}
                Educational video descriptions may contain links to creator
                channels. We are not responsible for external websites' privacy
                practices.
              </p>
              <p className="text-yellow-300">
                ⚠️ We recommend parents supervise their children's internet use
                and review YouTube's privacy policy.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              9. Your Rights & Choices
            </h2>
            <div className="space-y-3">
              <p>You (or your parent/guardian) have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong>Access Your Data:</strong> Request a copy of all
                  personal information we have
                </li>
                <li>
                  <strong>Correct Your Data:</strong> Update inaccurate
                  information in your account
                </li>
                <li>
                  <strong>Delete Your Data:</strong> Request complete deletion
                  of your account and data
                </li>
                <li>
                  <strong>Stop Data Collection:</strong> Refuse further
                  collection by deleting your account
                </li>
                <li>
                  <strong>Export Your Data:</strong> Receive your data in a
                  portable format
                </li>
              </ul>
              <p className="mt-4">
                <strong className="text-purple-400">
                  To Exercise These Rights:
                </strong>{" "}
                Email content@instagem.com with your request.
              </p>
            </div>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              10. Changes to This Privacy Policy
            </h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will
              notify users of significant changes through the platform and email
              (to parent emails for users under 13). Your continued use after
              changes constitutes acceptance.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              11. Contact Us About Privacy
            </h2>
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400 rounded-xl p-6">
              <p className="mb-3">
                If you have questions or concerns about privacy:
              </p>
              <p className="text-blue-400">
                <strong>Email:</strong> content@instagem.com
              </p>
              <p className="text-blue-400 mt-2">
                <strong>Subject Line:</strong> "Privacy Inquiry" or "Parent
                Request"
              </p>
              <p className="text-sm text-gray-400 mt-4">
                For parent requests regarding children under 13, please include
                your child's username and relationship verification.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                We respond to all privacy inquiries within 48 hours.
              </p>
            </div>
          </section>

          {/* Consent */}
          <section className="border-t border-gray-700 pt-6">
            <h2 className="text-2xl font-bold text-white mb-4">Your Consent</h2>
            <p className="text-gray-400">
              By creating an account on InstaGem, you (or your parent/guardian)
              consent to the collection and use of information as described in
              this Privacy Policy.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate("/terms-of-service")}
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Terms of Service
          </button>
          <span className="text-gray-600">•</span>
          <button
            onClick={() => navigate("/content-guidelines")}
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Content Guidelines
          </button>
          <span className="text-gray-600">•</span>
          <button
            onClick={() => navigate("/")}
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
