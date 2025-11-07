import React from "react";
import { useNavigate } from "react-router-dom";

export const TermsOfService: React.FC = () => {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Terms of Service
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
              Welcome to InstaGem! We're an educational video platform designed
              for children aged 1-17 years old. By using InstaGem, you agree to
              these Terms of Service. If you're under 18, your parent or
              guardian must read and agree to these terms on your behalf.
            </p>
            <p className="text-purple-400 font-semibold">
              "Let them watch. They'll learn something new every day!" 📱✨
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Eligibility & Age Requirements
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="text-purple-400">Age Range:</strong> InstaGem
                is for children aged 1-17 years old.
              </p>
              <p>
                <strong className="text-purple-400">Parent Consent:</strong> For
                children under 13 years old, parent or guardian consent is
                required (COPPA compliance).
              </p>
              <p>
                <strong className="text-purple-400">Parent Email:</strong> A
                valid parent/guardian email must be provided during registration
                for children under 13.
              </p>
              <p>
                <strong className="text-purple-400">Account Creation:</strong>{" "}
                You must provide accurate information during registration,
                including your child's real age.
              </p>
            </div>
          </section>

          {/* Educational Content */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. Educational Content
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="text-purple-400">
                  Curated Content Only:
                </strong>{" "}
                All videos on InstaGem are curated educational content from
                trusted sources including Khan Academy, National Geographic
                Kids, PBS Kids, NASA, TED-Ed, and other educational channels.
              </p>
              <p>
                <strong className="text-purple-400">No User Uploads:</strong>{" "}
                Users cannot upload their own videos. This ensures all content
                is safe, educational, and age-appropriate.
              </p>
              <p>
                <strong className="text-purple-400">Embedded Content:</strong>{" "}
                All videos are embedded from YouTube using their official embed
                feature. We do not host, download, or modify any video content.
              </p>
              <p>
                <strong className="text-purple-400">Content Updates:</strong> We
                reserve the right to add or remove educational content at any
                time to maintain quality and appropriateness.
              </p>
            </div>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. User Conduct & Community Guidelines
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="text-purple-400">
                  Respectful Comments:
                </strong>{" "}
                When commenting on videos, users must:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Be kind and respectful to others</li>
                <li>Stay on topic and discuss educational content</li>
                <li>Not use inappropriate language or bullying</li>
                <li>
                  Not share personal information (addresses, phone numbers,
                  schools)
                </li>
                <li>Not post spam or advertisements</li>
              </ul>
              <p>
                <strong className="text-purple-400">
                  Prohibited Activities:
                </strong>{" "}
                You may not:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Attempt to upload or share inappropriate content</li>
                <li>Harass, bully, or threaten other users</li>
                <li>Impersonate others or create fake accounts</li>
                <li>Attempt to hack or disrupt the platform</li>
                <li>
                  Use the platform for commercial purposes without permission
                </li>
              </ul>
            </div>
          </section>

          {/* Account Management */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Account Management
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="text-purple-400">Account Security:</strong>{" "}
                You are responsible for keeping your password secure and
                confidential.
              </p>
              <p>
                <strong className="text-purple-400">
                  Account Termination:
                </strong>{" "}
                We reserve the right to suspend or terminate accounts that
                violate these terms or engage in inappropriate behavior.
              </p>
              <p>
                <strong className="text-purple-400">Parent Access:</strong>{" "}
                Parents/guardians can request access to their child's account
                information or request account deletion at any time.
              </p>
              <p>
                <strong className="text-purple-400">Data Deletion:</strong> To
                delete your child's account and data, contact us at
                content@instagem.com.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              6. Intellectual Property
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="text-purple-400">
                  Third-Party Content:
                </strong>{" "}
                All educational videos remain the property of their respective
                creators and original publishers.
              </p>
              <p>
                <strong className="text-purple-400">InstaGem Platform:</strong>{" "}
                The InstaGem platform design, logo, and original features are
                protected by copyright.
              </p>
              <p>
                <strong className="text-purple-400">User Comments:</strong> By
                posting comments, you grant InstaGem a license to display your
                comments on the platform.
              </p>
            </div>
          </section>

          {/* Disclaimer of Warranties */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Disclaimer of Warranties
            </h2>
            <div className="space-y-3">
              <p>
                InstaGem is provided "as is" without warranties of any kind. We
                strive to provide high-quality educational content but cannot
                guarantee:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Uninterrupted or error-free service</li>
                <li>
                  Availability of specific videos (content may be removed by
                  original creators)
                </li>
                <li>Specific educational outcomes or results</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              8. Limitation of Liability
            </h2>
            <p className="mb-4">
              InstaGem and its creators are not liable for any indirect,
              incidental, or consequential damages arising from your use of the
              platform. Our liability is limited to the maximum extent permitted
              by law.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              9. Changes to Terms
            </h2>
            <p className="mb-4">
              We may update these Terms of Service from time to time. We will
              notify users of significant changes through the platform. Your
              continued use of InstaGem after changes constitutes acceptance of
              the new terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              10. Contact Us
            </h2>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400 rounded-xl p-6">
              <p className="mb-3">
                If you have questions about these Terms of Service, please
                contact us:
              </p>
              <p className="text-purple-400">
                <strong>Email:</strong> content@instagem.com
              </p>
              <p className="text-purple-400 mt-2">
                <strong>Subject Line:</strong> "Terms of Service Inquiry"
              </p>
              <p className="text-sm text-gray-400 mt-4">
                We typically respond within 2-3 business days.
              </p>
            </div>
          </section>

          {/* Acceptance */}
          <section className="border-t border-gray-700 pt-6">
            <h2 className="text-2xl font-bold text-white mb-4">Agreement</h2>
            <p className="text-gray-400">
              By creating an account and using InstaGem, you acknowledge that
              you have read, understood, and agree to be bound by these Terms of
              Service.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate("/privacy-policy")}
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Privacy Policy
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
