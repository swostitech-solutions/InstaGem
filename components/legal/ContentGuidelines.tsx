import React from "react";
import { useNavigate } from "react-router-dom";

export const ContentGuidelines: React.FC = () => {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Content Guidelines
          </h1>
          <p className="text-gray-400 text-sm">
            Last Updated: November 5, 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400 rounded-xl p-6">
              <p className="text-lg mb-3">
                "Let them watch. They'll learn something new every day!" 📱✨
              </p>
              <p>
                InstaGem is dedicated to providing a safe, educational
                environment where children aged 1-17 can watch curated
                educational videos from trusted sources. Every video is
                handpicked to ensure it's educational, age-appropriate, and
                enriching.
              </p>
            </div>
          </section>

          {/* Content Curation */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Our Content Curation Process
            </h2>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              What We Include:
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
              <li>
                <strong>Educational Videos Only:</strong> Science, Math, Art,
                History, Geography, Social-Emotional Learning
              </li>
              <li>
                <strong>Trusted Sources:</strong> Khan Academy, National
                Geographic Kids, PBS Kids, Sesame Street, NASA, TED-Ed, and
                other verified educational channels
              </li>
              <li>
                <strong>Age-Appropriate:</strong> Content suitable for children
                ages 1-17
              </li>
              <li>
                <strong>Positive Messaging:</strong> Videos that inspire
                curiosity, creativity, and learning
              </li>
              <li>
                <strong>Safe & Clean:</strong> No violence, inappropriate
                language, or scary content
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              What We Exclude:
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-2 text-red-300">
              <li>❌ Entertainment-only content with no educational value</li>
              <li>
                ❌ User-generated uploads (no uploads allowed on InstaGem)
              </li>
              <li>❌ Content with violence, profanity, or adult themes</li>
              <li>❌ Scary or disturbing content</li>
              <li>❌ Commercial advertisements or product placements</li>
              <li>❌ Content that promotes unhealthy behaviors</li>
            </ul>
          </section>

          {/* Video Sources */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Our Trusted Video Sources
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-xl p-4 border border-purple-400">
                <h4 className="font-bold text-purple-400 mb-2">
                  📚 Educational Institutions
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• Khan Academy (Math, Science, History)</li>
                  <li>• TED-Ed (Educational talks)</li>
                  <li>• NASA Kids Club (Space & Science)</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 border border-blue-400">
                <h4 className="font-bold text-blue-400 mb-2">
                  🎨 Educational Media
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• PBS Kids (Art, Music, Social Learning)</li>
                  <li>• Sesame Street (Social-Emotional)</li>
                  <li>• National Geographic Kids (Nature)</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 border border-green-400">
                <h4 className="font-bold text-green-400 mb-2">
                  🔬 Science Channels
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• Crash Course Kids (Science)</li>
                  <li>• SciShow Kids (Science Experiments)</li>
                  <li>• Mark Rober (STEM/Engineering)</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 border border-orange-400">
                <h4 className="font-bold text-orange-400 mb-2">
                  🎓 Early Learning
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• Numberblocks (Math for Ages 3-7)</li>
                  <li>• Alphablocks (Reading & Phonics)</li>
                  <li>• Peekaboo Kidz (Science for Kids)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Age Appropriateness */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. Age-Appropriate Content
            </h2>
            <div className="space-y-4">
              <div className="bg-purple-500/10 border-l-4 border-purple-400 p-4 rounded-r-xl">
                <h4 className="font-bold text-purple-400 mb-2">
                  👶 Ages 1-4 (Toddlers & Preschool)
                </h4>
                <p className="text-sm">
                  Simple counting, colors, shapes, letters, basic social skills.
                  Videos with songs, animations, and repetition.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Examples: Numberblocks, Alphablocks, Sesame Street
                </p>
              </div>
              <div className="bg-blue-500/10 border-l-4 border-blue-400 p-4 rounded-r-xl">
                <h4 className="font-bold text-blue-400 mb-2">
                  🧒 Ages 5-8 (Early Elementary)
                </h4>
                <p className="text-sm">
                  Basic math, science experiments, art projects, nature
                  exploration, social-emotional learning.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Examples: PBS Kids, SciShow Kids, Khan Academy
                </p>
              </div>
              <div className="bg-green-500/10 border-l-4 border-green-400 p-4 rounded-r-xl">
                <h4 className="font-bold text-green-400 mb-2">
                  👦 Ages 9-12 (Upper Elementary)
                </h4>
                <p className="text-sm">
                  Complex science topics, world history, geography, critical
                  thinking, STEM projects.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Examples: Crash Course Kids, TED-Ed, National Geographic
                </p>
              </div>
              <div className="bg-orange-500/10 border-l-4 border-orange-400 p-4 rounded-r-xl">
                <h4 className="font-bold text-orange-400 mb-2">
                  👧 Ages 13-17 (Teens)
                </h4>
                <p className="text-sm">
                  Advanced science, engineering, world issues, career
                  exploration, life skills.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Examples: Mark Rober, NASA, TED-Ed, Khan Academy
                </p>
              </div>
            </div>
          </section>

          {/* Community Guidelines */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Community Commenting Guidelines
            </h2>
            <p className="mb-4">
              Users can comment on educational videos to share their thoughts
              and learnings. To maintain a safe, positive environment, all
              comments must follow these guidelines:
            </p>

            <h3 className="text-xl font-semibold text-green-400 mb-3">
              ✅ Encouraged Comments:
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-2 mb-4 text-green-300">
              <li>Sharing what you learned from the video</li>
              <li>Asking educational questions</li>
              <li>Expressing excitement about learning</li>
              <li>Thanking the content creators</li>
              <li>Sharing related facts or knowledge</li>
              <li>Encouraging other learners</li>
            </ul>

            <h3 className="text-xl font-semibold text-red-400 mb-3">
              ❌ Prohibited Comments:
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-2 text-red-300">
              <li>Bullying, harassment, or mean comments</li>
              <li>
                Sharing personal information (addresses, phone numbers, schools)
              </li>
              <li>Inappropriate language or profanity</li>
              <li>Spam, advertisements, or promotional content</li>
              <li>Off-topic discussions unrelated to education</li>
              <li>Encouraging dangerous activities</li>
              <li>Hate speech or discrimination</li>
            </ul>
          </section>

          {/* Reporting */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Reporting Inappropriate Content or Comments
            </h2>
            <div className="bg-red-500/10 border border-red-400 rounded-xl p-6">
              <p className="text-red-300 font-semibold mb-3">
                🚨 If you see something inappropriate:
              </p>
              <ol className="list-decimal list-inside ml-4 space-y-2">
                <li>
                  <strong>For Inappropriate Comments:</strong> Take a screenshot
                  and email us immediately
                </li>
                <li>
                  <strong>For Videos:</strong> Let us know which video has
                  issues
                </li>
                <li>
                  <strong>Email:</strong> content@instagem.com
                </li>
                <li>
                  <strong>Subject Line:</strong> "Report Inappropriate Content"
                </li>
                <li>
                  <strong>Include:</strong> Username (if comment), video title,
                  what the issue is
                </li>
              </ol>
              <p className="text-sm text-gray-400 mt-4">
                We review all reports within 24 hours and take immediate action
                on violations.
              </p>
            </div>
          </section>

          {/* Consequences */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              6. Consequences for Violations
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="text-yellow-400">First Violation:</strong>{" "}
                Warning and comment removal
              </p>
              <p>
                <strong className="text-orange-400">Second Violation:</strong>{" "}
                Temporary commenting suspension (7 days)
              </p>
              <p>
                <strong className="text-red-400">Third Violation:</strong>{" "}
                Permanent commenting ban
              </p>
              <p>
                <strong className="text-red-500">Severe Violations:</strong>{" "}
                Immediate account suspension or ban
              </p>
              <p className="text-sm text-gray-400 mt-4">
                Severe violations include: harassment, sharing personal
                information, hate speech, or attempting to bypass platform
                safety measures.
              </p>
            </div>
          </section>

          {/* Parent Involvement */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Parent/Guardian Involvement
            </h2>
            <div className="bg-blue-500/10 border border-blue-400 rounded-xl p-6 space-y-3">
              <p className="text-blue-300 font-semibold">
                👨‍👩‍👧 We encourage parents to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Watch videos together with younger children</li>
                <li>Discuss what they learned from each video</li>
                <li>Review their child's comment activity periodically</li>
                <li>Report any concerns to us immediately</li>
                <li>Set screen time limits appropriate for their child</li>
              </ul>
              <p className="text-sm text-gray-400 mt-4">
                Parents can request a summary of their child's activity by
                emailing content@instagem.com
              </p>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              8. Content Updates & Removals
            </h2>
            <div className="space-y-3">
              <p>
                <strong className="text-purple-400">Regular Reviews:</strong> We
                continuously review our content library to ensure quality and
                appropriateness.
              </p>
              <p>
                <strong className="text-purple-400">New Additions:</strong> We
                regularly add new educational videos from trusted sources.
              </p>
              <p>
                <strong className="text-purple-400">Content Removal:</strong>{" "}
                Videos may be removed if they no longer meet our standards or if
                requested by copyright holders.
              </p>
              <p>
                <strong className="text-purple-400">
                  Suggestions Welcome:
                </strong>{" "}
                Have a suggestion for educational content? Email us at
                content@instagem.com
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              9. Contact Us
            </h2>
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400 rounded-xl p-6">
              <p className="mb-3">Questions about our content guidelines?</p>
              <p className="text-green-400">
                <strong>Email:</strong> content@instagem.com
              </p>
              <p className="text-green-400 mt-2">
                <strong>Subject Line:</strong> "Content Guidelines Inquiry"
              </p>
              <p className="text-sm text-gray-400 mt-4">
                We're here to ensure InstaGem remains a safe, educational space
                for all children.
              </p>
            </div>
          </section>

          {/* Commitment */}
          <section className="border-t border-gray-700 pt-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Our Commitment
            </h2>
            <p className="text-gray-400">
              InstaGem is committed to maintaining the highest standards of
              educational quality and child safety. These guidelines help us
              create a positive learning environment where every child can
              explore, learn, and grow safely.
            </p>
            <p className="text-purple-400 font-semibold mt-4 text-center text-lg">
              "Let them watch. They'll learn something new every day!" 📱✨
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
            onClick={() => navigate("/privacy-policy")}
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Privacy Policy
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
