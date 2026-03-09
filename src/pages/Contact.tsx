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
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="px-8 md:px-12 py-12 md:py-16">
      <div className="space-y-3 mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-white/50">Contact</p>
        <div className="w-12 h-px bg-white/30" />
        <h1 className="text-3xl md:text-4xl font-serif text-white">Get in touch</h1>
        <p className="text-sm text-white/50 max-w-lg">
          Feel free to reach out for collaborations, questions, or just to say hello.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-[10px] tracking-[0.2em] uppercase text-white/40">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              maxLength={100}
              className="bg-white/5 border-white/10 text-white rounded-sm placeholder:text-white/20"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[10px] tracking-[0.2em] uppercase text-white/40">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              maxLength={255}
              className="bg-white/5 border-white/10 text-white rounded-sm placeholder:text-white/20"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-[10px] tracking-[0.2em] uppercase text-white/40">Message</Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              maxLength={2000}
              rows={5}
              className="bg-white/5 border-white/10 text-white rounded-sm resize-none placeholder:text-white/20"
            />
          </div>
          <Button type="submit" className="rounded-sm tracking-[0.2em] uppercase text-[10px] px-6 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20">
            Send Message
          </Button>
        </form>

        <div className="space-y-8">
          <blockquote className="border-l border-white/20 pl-5">
            <p className="text-lg font-serif italic text-white/80 leading-relaxed">
              "If you wish to make an apple pie from scratch, you must first invent the universe."
            </p>
            <cite className="text-xs text-white/40 mt-2 block not-italic">— Carl Sagan</cite>
          </blockquote>

          <div className="space-y-2 text-xs text-white/40">
            <p>Centre for Mathematical Plasma Astrophysics</p>
            <p>Katholieke Universiteit Leuven</p>
            <p>Belgium</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
