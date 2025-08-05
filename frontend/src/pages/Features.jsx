import React from 'react'
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { BarChart3, Target, Zap, TrendingUp, Activity, Code2, Trophy, Chrome, Calendar, Users,Pen } from "lucide-react"
const features = [
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set daily/weekly coding goals and monitor progress visually.",
    details:
      "Create personalized coding targets, track completion rates, and visualize your progress with intuitive charts and progress bars.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Automatic Submission Tracking",
    description: "Submissions are tracked automatically from sites like LeetCode, Codeforces, etc.",
    details:
      "Connect your coding platforms and let our system automatically sync your submissions, problems solved, and contest participation.",
    color: "from-blue-500 to-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Streaks & Milestones",
    description: "Visual indicators to keep coding streaks alive and reward consistency.",
    details:
      "Maintain your coding momentum with streak counters and milestone celebrations that keep you motivated.",
    color: "from-green-500 to-blue-500",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Get platform-wise breakdowns, topic stats, and difficulty-based charts.",
    details:
      "Dive deep into your coding patterns with comprehensive analytics, topic mastery tracking, and performance insights.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Chrome,
    title: "Browser Extension",
    description: "Seamless integration with your favorite coding platforms.",
    details:
      "Install our lightweight browser extension to automatically capture your coding activity across multiple platforms.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Pen,
    title: "Level classification ",
    description: "Classify problem ",
    details: "You can classify problem into different categories based on your level ",
    color: "from-violet-500 to-purple-500",
  },
]
const Features = () => {

  return (
    <div>
        <div className="min-h-screen  text-white">
      
      <section className="px-6 py-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <Badge className="mb-8 bg-purple-900/50 text-purple-300 border-purple-700/50 hover:bg-purple-900/70 px-4 py-2 text-sm">
          ✨ Powerful Features
        </Badge>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-600 bg-clip-text text-transparent">
            Everything You Need
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
          CodeTracker Pro combines goal setting, automatic tracking, and powerful analytics to supercharge
          your coding journey.
        </p>

        {/* Feature Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-20 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span>3+ Platforms Supported</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <span>Real-time Sync</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-indigo-400" />
            <span>Achievement System</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>10,000+ Active Users</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-gray-900/50 border-gray-800 hover:border-purple-700/50 transition-all duration-300 hover:bg-gray-900/70 hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-400 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{feature.details}</p>
               
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom Stats Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              3+
            </div>
            <div className="text-gray-400 text-sm">Platforms</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-gray-400 text-sm">Auto Sync</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              50+
            </div>
            <div className="text-gray-400 text-sm">Achievements</div>
          </div>
          
          
        </div>
      </section>
    </div>
    </div>
  )
}

export default Features