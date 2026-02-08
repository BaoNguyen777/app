'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Pen, Users, Zap, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

interface FormData {
  name: string
  email: string
  message: string
}

interface Service {
  icon: JSX.Element
  title: string
  description: string
}

interface PortfolioItem {
  title: string
  category: string
  description: string
  image: string
  results: string
}

export default function Portfolio(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const services: Service[] = [
    {
      icon: <Pen className="w-8 h-8 text-foreground" strokeWidth={2.2} />,
      title: 'Website Copy',
      description: 'Compelling website content that converts visitors into customers with persuasive messaging.'
    },
    {
      icon: <Users className="w-8 h-8 text-foreground" strokeWidth={2.2} />,
      title: 'Brand Storytelling',
      description: 'Authentic brand narratives that connect with your audience on an emotional level.'
    },
    {
      icon: <Zap className="w-8 h-8 text-foreground" strokeWidth={2.2} />,
      title: 'Email Marketing',
      description: 'Engaging email campaigns that drive opens, clicks, and conversions.'
    },
    {
      icon: <Mail className="w-8 h-8 text-foreground" strokeWidth={2.2} />,
      title: 'Social Media Content',
      description: 'Attention-grabbing posts that boost engagement and grow your following.'
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-foreground" strokeWidth={2.2} />,
      title: 'Ad Copy',
      description: 'High-converting ad copy for Google, Facebook, and other platforms.'
    },
    {
      icon: <Pen className="w-8 h-8 text-foreground" strokeWidth={2.2} />,
      title: 'Blog Posts & Articles',
      description: 'SEO-optimized content that educates, entertains, and establishes authority.'
    }
  ]

  const portfolio: PortfolioItem[] = [
    {
      title: 'E-commerce Product Launch',
      category: 'Website Copy',
      description: 'Created compelling product descriptions and landing pages that increased conversion rates by 45%.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
      results: '+45% Conversion Rate'
    },
    {
      title: 'SaaS Email Campaign',
      category: 'Email Marketing',
      description: 'Developed a 6-email nurture sequence that doubled trial-to-paid conversions.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
      results: '2x Trial Conversions'
    },
    {
      title: 'Social Media Rebrand',
      category: 'Brand Storytelling',
      description: 'Crafted a new brand voice and content strategy that grew following by 200% in 3 months.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
      results: '+200% Follower Growth'
    }
  ]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Message sent successfully! I will get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f6f7] text-[#0b1023]">
      <section className="relative min-h-[820px] flex items-center justify-center overflow-hidden border-b border-black/5">
        <div
          className="absolute -inset-3 bg-center bg-cover blur-[2px] scale-[1.02]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1535957998253-26ae1ef29506?auto=format&fit=crop&w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-white/82" />

        <div className="relative z-10 max-w-[920px] mx-auto text-center px-6 pt-16">
          <Badge variant="outline" className="mb-6 text-[14px] px-6 py-2 bg-white/80 border-black/10 rounded-lg">
            Professional Copywriter
          </Badge>

          <h1 className="text-[78px] leading-[0.95] font-bold tracking-[-0.03em] text-[#090f2b]">
            Words That Convert
          </h1>

          <p className="mt-6 text-[24px] leading-[1.18] text-[#6f7583] max-w-[860px] mx-auto">
            I craft compelling copy that connects with your audience and drives results. From websites to emails, I will help your brand tell its story.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="h-14 px-10 text-[18px] bg-[#0c1338] hover:bg-[#0c1338]/95 rounded-lg"
              onClick={() => scrollToSection('contact')}
            >
              Let us Work Together
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 text-[18px] rounded-lg border-black/10 bg-white/70"
              onClick={() => scrollToSection('portfolio')}
            >
              View My Work
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-10 max-w-[860px] mx-auto">
            <div>
              <div className="text-[52px] leading-none font-bold">50+</div>
              <div className="text-[18px] text-[#727986] mt-2">Projects Completed</div>
            </div>
            <div>
              <div className="text-[52px] leading-none font-bold">98%</div>
              <div className="text-[18px] text-[#727986] mt-2">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-[52px] leading-none font-bold">5+</div>
              <div className="text-[18px] text-[#727986] mt-2">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="max-w-[1150px] mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="mb-4" variant="outline">Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What I Do</h2>
            <p className="text-xl text-[#717784]">Specialized copywriting services tailored to your business needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="bg-transparent border-black/10 shadow-sm rounded-2xl min-h-[235px]">
                <CardHeader>
                  <div className="mb-3">{service.icon}</div>
                  <CardTitle className="text-[40px]">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[16px] text-[#707783] leading-relaxed">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="mb-4" variant="outline">Portfolio</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Work</h2>
            <p className="text-xl text-[#717784]">Real results from real projects</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {portfolio.map((project, index) => (
              <Card key={index} className="overflow-hidden bg-transparent border-black/10 rounded-2xl shadow-sm">
                <div className="relative h-[225px] overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <Badge className="absolute top-4 right-4 rounded-md bg-[#121a3f] text-white">{project.results}</Badge>
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2 bg-[#eef0f4] text-[#151a2a]">{project.category}</Badge>
                  <CardTitle className="text-[40px]">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[16px] text-[#707783] leading-relaxed">{project.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 border-t border-black/5">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="mb-4" variant="outline">Contact</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let us Create Something Great</h2>
            <p className="text-xl text-[#717784]">Ready to elevate your content? Get in touch!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              {[{
                icon: <Mail className="w-6 h-6 text-foreground mt-1" strokeWidth={2.2} />, label: 'Email', value: 'hello@copywriter.com'
              }, {
                icon: <Phone className="w-6 h-6 text-foreground mt-1" strokeWidth={2.2} />, label: 'Phone', value: '+1 (555) 123-4567'
              }, {
                icon: <MapPin className="w-6 h-6 text-foreground mt-1" strokeWidth={2.2} />, label: 'Location', value: 'New York, NY'
              }].map((item) => (
                <Card key={item.label} className="bg-transparent border-black/10 rounded-2xl shadow-sm">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      {item.icon}
                      <div>
                        <CardTitle className="text-[18px] mb-1">{item.label}</CardTitle>
                        <CardDescription className="text-[14px] text-[#707783]">{item.value}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Card className="bg-transparent border-black/10 rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-[18px]">Send a Message</CardTitle>
                <CardDescription className="text-[16px] text-[#707783]">Fill out the form and I will get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 text-[16px] bg-white/70 border-black/10"
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 text-[16px] bg-white/70 border-black/10"
                  />
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="text-[16px] bg-white/70 border-black/10"
                  />
                  <Button type="submit" className="w-full h-12 text-[18px] bg-[#0c1338] hover:bg-[#0c1338]/95" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
