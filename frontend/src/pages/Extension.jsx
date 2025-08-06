import React from "react";
import { Chrome, Play, HelpCircle } from "lucide-react";
import { Button } from "../components/ui/button";
const Extension = () => {
  return (
    <div>
      <section className=" py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How the Extension Works
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our Chrome extension seamlessly tracks your coding submissions
              from platforms like LeetCode, updates your progress in real-time,
              and syncs everything with your personal dashboard. Stay motivated
              and monitor your coding journey effortlessly.
            </p>
          </div>

          <div className="space-y-12">
            {/* Step-by-step guide */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-6">
                Get Started in 4 Simple Steps
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {/* Step 1 */}
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                  <div className="flex-shrink-0 w-8  bg-gradient-to-r  from-purple-400  to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Install from Chrome Web Store
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Add the extension to your Chrome browser with a single
                      click from the official store.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Log in using your credentials
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Sign in with your existing account or create a new one to
                      start tracking.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Solve problems on LeetCode
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Continue your regular coding practice - the extension
                      works automatically in the background.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Track your streak and progress instantly
                    </h4>
                    <p className="text-gray-400 text-sm">
                      View real-time updates of your coding streak, solved
                      problems, and detailed analytics.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Button className="bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105">
                  <Chrome className="w-5 h-5 mr-2" />
                  Add to Chrome - It's Free
                </Button>
              </div>
            </div>

            {/* Video container with browser frame */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-1 shadow-2xl">
                {/* Browser frame header */}
                <div className="bg-gray-700 rounded-t-lg px-4 py-3 flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-600 rounded px-3 py-1 text-xs text-gray-300 text-center">
                      chrome-extension://tutorial
                    </div>
                  </div>
                </div>

                {/* Video container */}
                <div className="relative bg-black rounded-b-lg overflow-hidden aspect-video group">
                  {/* Video embed (YouTube iframe) */}
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/osmzwWw4RYM"
                    title="Extension Tutorial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>

                  {/* Overlay appears only on hover */}
                  
                </div>
              </div>

              {/* Help link */}
              <div className="text-center mt-6">
                <a
                  href="mailto:farehaaslam57@gmail.com"
                  className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Need Help? contact us 
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Extension;
