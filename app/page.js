'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Pen, Users, Zap, Mail, Phone, MapPin, ArrowRight, Quote, Star } from 'lucide-react'
import { toast } from 'sonner'

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const services = [
    {
      icon: <Pen className="w-8 h-8 text-primary" />,
      title: 'Website Copy',
      description: 'Compelling website content that converts visitors into customers with persuasive messaging.'
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Brand Storytelling',
      description: 'Authentic brand narratives that connect with your audience on an emotional level.'
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'Email Marketing',
      description: 'Engaging email campaigns that drive opens, clicks, and conversions.'
    },
    {
      icon: <Mail className="w-8 h-8 text-primary" />,
      title: 'Social Media Content',
      description: 'Attention-grabbing posts that boost engagement and grow your following.'
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
      title: 'Ad Copy',
      description: 'High-converting ad copy for Google, Facebook, and other platforms.'
    },
    {
      icon: <Pen className="w-8 h-8 text-primary" />,
      title: 'Blog Posts & Articles',
      description: 'SEO-optimized content that educates, entertains, and establishes authority.'
    }
  ]

  const portfolio = [
    {
      title: 'E-commerce Product Launch',
      category: 'Website Copy',
      description: 'Created compelling product descriptions and landing pages that increased conversion rates by 45%.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwxfHx3cml0aW5nfGVufDB8fHx8MTc3MDM4ODQyMXww&ixlib=rb-4.1.0&q=85',
      results: '+45% Conversion Rate'
    },
    {
      title: 'SaaS Email Campaign',
      category: 'Email Marketing',
      description: 'Developed a 6-email nurture sequence that doubled trial-to-paid conversions.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwyfHx3cml0aW5nfGVufDB8fHx8MTc3MDM4ODQyMXww&ixlib=rb-4.1.0&q=85',
      results: '2x Trial Conversions'
    },
    {
      title: 'Social Media Rebrand',
      category: 'Brand Storytelling',
      description: 'Crafted a new brand voice and content strategy that grew following by 200% in 3 months.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwzfHx3cml0aW5nfGVufDB8fHx8MTc3MDM4ODQyMXww&ixlib=rb-4.1.0&q=85',
      results: '+200% Follower Growth'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      content: 'The copy transformed our website completely. We saw immediate results with a 60% increase in lead generation.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director, GrowthLabs',
      content: 'Outstanding work! The email campaigns have been our best performing yet. Highly recommend!',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, Bloom Boutique',
      content: 'Professional, creative, and results-driven. The product descriptions have significantly improved our sales.',
      rating: 5
    }
  ]

  const handleSubmit = async (e) => {
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
        toast.success('Message sent successfully! I\'ll get back to you soon.')
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1535957998253-26ae1ef29506?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwxfHx3b3Jrc3BhY2V8ZW58MHx8fHwxNzcwMzg4NDE2fDA&ixlib=rb-4.1.0&q=85')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="container relative z-10 px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="text-lg px-4 py-2" variant="secondary">
              Professional Copywriter
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Words That <span className="text-primary">Convert</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              I craft compelling copy that connects with your audience and drives results. 
              From websites to emails, I will help your brand tell its story.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                Let us Work Together
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}>
                View My Work
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
              <div>
                <div className="text-4xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What I Do</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized copywriting services tailored to your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Portfolio</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Work</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real results from real projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolio.map((project, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">{project.results}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{project.category}</Badge>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4" variant="outline">About Me</Badge>
                <h2 className="text-4xl font-bold mb-6">Hi, I'm a Copywriter Who Gets Results</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    With over 5 years of experience crafting words that convert, I specialize in 
                    creating compelling copy that resonates with audiences and drives measurable results.
                  </p>
                  <p>
                    I believe great copy is more than just words on a page—it's about understanding 
                    your audience, telling your brand's unique story, and creating content that inspires action.
                  </p>
                  <p>
                    Whether you're launching a new product, rebranding, or looking to boost your 
                    marketing performance, I'm here to help your words work harder for you.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  <Badge variant="secondary">SEO Copywriting</Badge>
                  <Badge variant="secondary">Content Strategy</Badge>
                  <Badge variant="secondary">Brand Voice</Badge>
                  <Badge variant="secondary">Conversion Optimization</Badge>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.pexels.com/photos/29152435/pexels-photo-29152435.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Professional workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take my word for it
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="outline">Contact</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Create Something Great</h2>
              <p className="text-xl text-muted-foreground">
                Ready to elevate your content? Get in touch!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-lg mb-2">Email</CardTitle>
                        <CardDescription className="text-base">hello@copywriter.com</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-lg mb-2">Phone</CardTitle>
                        <CardDescription className="text-base">+1 (555) 123-4567</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-lg mb-2">Location</CardTitle>
                        <CardDescription className="text-base">New York, NY</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>Fill out the form and I'll get back to you within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input 
                        type="text" 
                        name="name"
                        placeholder="Your Name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Input 
                        type="email" 
                        name="email"
                        placeholder="Your Email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Textarea 
                        name="message"
                        placeholder="Tell me about your project..." 
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <div className="text-2xl font-bold mb-2">Professional Copywriter</div>
                <p className="text-muted-foreground">Crafting words that convert</p>
              </div>
              <div className="text-center md:text-right text-muted-foreground">
                <p>&copy; 2025 All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
