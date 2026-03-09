import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just show a toast — can connect to an email service later
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="space-y-4 mb-16">
          <p className="text-sm tracking-widest uppercase text-primary">Contact</p>
          <h1 className="text-5xl md:text-6xl font-serif text-foreground">Get in touch</h1>
          <p className="text-muted-foreground max-w-lg">
            Looking forward to answering your email. Feel free to reach out for collaborations, 
            questions, or just to say hello.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm tracking-wide uppercase text-muted-foreground">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                maxLength={100}
                className="bg-card border-border rounded-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm tracking-wide uppercase text-muted-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                maxLength={255}
                className="bg-card border-border rounded-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm tracking-wide uppercase text-muted-foreground">Message</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                maxLength={2000}
                rows={6}
                className="bg-card border-border rounded-sm resize-none"
              />
            </div>
            <Button type="submit" className="rounded-sm tracking-wide uppercase text-sm px-8">
              Send Message
            </Button>
          </form>

          <div className="space-y-8">
            <blockquote className="border-l-2 border-primary/30 pl-6">
              <p className="text-xl font-serif italic text-foreground leading-relaxed">
                "If you wish to make an apple pie from scratch, you must first invent the universe."
              </p>
              <cite className="text-sm text-muted-foreground mt-2 block not-italic">— Carl Sagan</cite>
            </blockquote>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Centre for Mathematical Plasma Astrophysics</p>
              <p>Katholieke Universiteit Leuven</p>
              <p>Belgium</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
