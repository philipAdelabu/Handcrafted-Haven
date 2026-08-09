import Image from 'next/image'
import Link from 'next/link'
import { 
  Heart, 
  Users, 
  Award, 
  Globe, 
  Sparkles,
  ShoppingBag,
  Shield,
  Truck,
  Star,
  ArrowRight,
  Mail,
  MapPin,
  Phone
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Handcrafted with Love</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About Handcrafted Haven
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            We connect you with skilled artisans from around the world, 
            bringing you unique, handcrafted treasures made with passion and purpose.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Story
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Handcrafted Haven was born from a simple idea: to create a space where 
                talented artisans can share their craft with the world, and where customers 
                can find truly unique, handmade treasures.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                What started as a small marketplace has grown into a global community of 
                over 100 artisans from 50+ countries, each bringing their unique skills 
                and cultural heritage to our platform.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every product tells a story - of dedication, tradition, and the human 
                touch that mass production can never replicate. We're proud to be the 
                bridge between these incredible makers and the people who appreciate 
                their craft.
              </p>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                    <div className="text-4xl font-bold text-indigo-600">100+</div>
                    <div className="text-gray-600 text-sm">Artisans</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                    <div className="text-4xl font-bold text-purple-600">50+</div>
                    <div className="text-gray-600 text-sm">Countries</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                    <div className="text-4xl font-bold text-pink-600">500+</div>
                    <div className="text-gray-600 text-sm">Unique Products</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                    <div className="text-4xl font-bold text-indigo-600">4.9★</div>
                    <div className="text-gray-600 text-sm">Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Values</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8 text-pink-500" />,
                title: 'Authenticity',
                description: 'Every product is genuinely handcrafted by skilled artisans, not mass-produced in factories.'
              },
              {
                icon: <Globe className="w-8 h-8 text-blue-500" />,
                title: 'Sustainability',
                description: 'We support ethical production and sustainable practices, respecting both people and the planet.'
              },
              {
                icon: <Users className="w-8 h-8 text-purple-500" />,
                title: 'Community',
                description: 'We foster connections between artisans and customers, creating a global community of craft lovers.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex p-4 bg-white rounded-full shadow-md mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Meet the Team</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Founder & CEO',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
                bio: 'Passionate about connecting artisans with the world'
              },
              {
                name: 'Michael Chen',
                role: 'Head Curator',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
                bio: 'Expert in discovering unique handcrafted treasures'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Community Manager',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
                bio: 'Building bridges between artisans and customers'
              },
              {
                name: 'David Kim',
                role: 'Operations Director',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
                bio: 'Ensuring smooth delivery of every handmade piece'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{member.role}</p>
                  <p className="text-xs text-gray-500 mt-2">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Be part of a community that celebrates craftsmanship, creativity, and the beauty of handmade goods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                Explore Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}