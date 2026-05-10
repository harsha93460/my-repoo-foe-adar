import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  Bike,
  FileText,
  Phone,
  MapPin,
  Star,
  CheckCircle,
  Menu,
  X,
  ChevronRight,
  Users,
  Award,
  Clock,
  Shield,
  ThumbsUp,
  Navigation,
  Send,
  Loader2,
  PartyPopper } from
"lucide-react";

const API = "/api";

/* ─── DATA ─────────────────────────────────────────────────────────── */
const NAV_LINKS = [
{ label: "Home", href: "#home" },
{ label: "About", href: "#about" },
{ label: "Services", href: "#services" },
{ label: "Reviews", href: "#reviews" },
{ label: "Enroll", href: "#enroll" },
{ label: "Contact", href: "#contact" }];


const STATS = [
  { value: "50+", label: "Happy Customers", icon: Users },
  { value: "98%", label: "License Success Rate", icon: Award },
  { value: "100%", label: "Road Safety Focus", icon: Shield }];


const SERVICES = [
{
  id: "basic-riding",
  icon: Bike,
  title: "Basic 2-Wheeler Riding",
  description:
  "Start your riding journey with confidence. Our certified instructors teach you balance, throttle control, braking, and safe maneuvering — perfect for complete beginners.",
  features: [
  "Beginner-friendly training",
  "Balance & control techniques",
  "Real-road practice sessions",
  "Safety gear provided"]

},
{
  id: "license-prep",
  icon: FileText,
  title: "License Preparation",
  description:
  "Pass your driving license test on the first attempt. We cover traffic rules, road signs, and the official RTO test format thoroughly.",
  features: [
  "RTO test preparation",
  "Traffic rules & road signs",
  "Mock test sessions",
  "Document assistance"]

}];


const WHY_US = [
{
  icon: Shield,
  title: "Safety First",
  desc: "We prioritize your safety above everything. Helmets and safety gear are mandatory in every session."
},
{
  icon: Users,
  title: "Expert Instructors",
  desc: "Our RTO-certified instructors have years of experience training riders of all skill levels."
},
{
  icon: ThumbsUp,
  title: "Flexible Timings",
  desc: "Morning and evening batches available 6 days a week to fit your busy schedule."
},
{
  icon: Award,
  title: "Proven Track Record",
  desc: "98% of our students clear their driving license test on the first attempt."
}];


const REVIEWS = [
{
  name: "Ravi Kumar",
  location: "Gachibowli, Hyderabad",
  rating: 5,
  review:
  "Best driving school in Hyderabad! Instructors are very patient and professional. Got my license on the very first attempt. Highly recommend Learn and Drive to everyone!",
  initials: "RK",
  color: "bg-amber-100 text-amber-800"
},
{
  name: "Priya Reddy",
  location: "Kondapur, Hyderabad",
  rating: 5,
  review:
  "I was very nervous about riding a 2-wheeler, but the trainers here made me feel confident within just one week. The step-by-step training approach is excellent.",
  initials: "PR",
  color: "bg-green-100 text-green-800"
},
{
  name: "Sai Kiran",
  location: "Narsingi, Hyderabad",
  rating: 5,
  review:
  "Excellent training facility near Khajaguda! The practical sessions on real roads were very helpful. The instructors explain everything clearly and patiently.",
  initials: "SK",
  color: "bg-blue-100 text-blue-800"
},
{
  name: "Anjali Sharma",
  location: "Financial District, Hyderabad",
  rating: 5,
  review:
  "The license preparation course is worth every rupee. Got my DL on the first attempt! Theory classes are very well structured and the mock tests helped a lot.",
  initials: "AS",
  color: "bg-purple-100 text-purple-800"
},
{
  name: "Venkat Rao",
  location: "Puppalaguda, Hyderabad",
  rating: 5,
  review:
  "My daughter learned riding here in just 10 days. The instructors are extremely patient with beginners. Great school and very trustworthy. 100% recommended!",
  initials: "VR",
  color: "bg-rose-100 text-rose-800"
},
{
  name: "Mohammed Faizan",
  location: "Manikonda, Hyderabad",
  rating: 5,
  review:
  "Professional training with very reasonable fees. The traffic rules and road safety sessions are a big plus. Would definitely recommend this school to friends and family.",
  initials: "MF",
  color: "bg-teal-100 text-teal-800"
}];


/* ─── STAR RATING ───────────────────────────────────────────────────── */
const StarRating = ({ count = 5 }) =>
<div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) =>
  <Star key={i} size={16} className="fill-[#FFB800] text-[#FFB800]" />
  )}
  </div>;


/* ─── NAVBAR ────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ?
      "backdrop-blur-xl bg-white/90 border-b border-slate-200 shadow-sm" :
      "bg-transparent"}`
      }>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#home"
          data-testid="nav-logo"
          onClick={(e) => {e.preventDefault();handleNav("#home");}}
          className="flex items-center gap-2 group">

          <div className="w-9 h-9 rounded-lg bg-[#FFB800] flex items-center justify-center shadow-[2px_2px_0px_#0F172A] group-hover:shadow-none group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
            <Bike size={20} className="text-black" />
          </div>
          <span className="font-heading text-xl font-black text-slate-900 tracking-tight">
            Learn<span className="text-[#FFB800]">&</span>Drive
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {NAV_LINKS.map((link) =>
          <a
            key={link.href}
            href={link.href}
            data-testid={`nav-link-${link.label.toLowerCase()}`}
            onClick={(e) => {e.preventDefault();handleNav(link.href);}}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FFB800] after:transition-all hover:after:w-full">

              {link.label}
            </a>
          )}
        </nav>

        {/* CTA */}
        <a
          href="tel:9985747111"
          data-testid="cta-call-button"
          className="hidden md:flex items-center gap-2 bg-[#FFB800] text-black font-bold px-5 py-2.5 rounded-lg text-sm shadow-[3px_3px_0px_#0F172A] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">

          <Phone size={15} />
          Call Now
        </a>

        {/* Mobile Menu Toggle */}
        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu">

          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen &&
      <div data-testid="mobile-menu" className="md:hidden bg-white border-t border-slate-200 shadow-lg px-6 py-4 space-y-1">
          {NAV_LINKS.map((link) =>
        <a
          key={link.href}
          href={link.href}
          data-testid={`mobile-nav-${link.label.toLowerCase()}`}
          onClick={(e) => {e.preventDefault();handleNav(link.href);}}
          className="block py-3 text-base font-semibold text-slate-700 hover:text-[#FFB800] border-b border-slate-100 transition-colors">

              {link.label}
            </a>
        )}
          <a
          href="tel:9985747111"
          data-testid="mobile-call-button"
          className="flex items-center justify-center gap-2 mt-4 bg-[#FFB800] text-black font-bold px-5 py-3 rounded-lg text-sm w-full">

            <Phone size={15} />
            Call: 9985747111
          </a>
        </div>
      }
    </header>);

};

/* ─── HERO ──────────────────────────────────────────────────────────── */
const Hero = () =>
<section
  id="home"
  data-testid="hero-section"
  className="min-h-screen bg-[#FDFDFD] pt-20 flex items-center overflow-hidden">

    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center w-full">
      {/* Left */}
      <div className="hero-text-animate space-y-6 md:space-y-8">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse"></span>
          <span className="text-sm font-bold text-amber-700 uppercase tracking-widest">
            #1 Riding School in Khajaguda
          </span>
        </div>

        <h1 data-testid="hero-headline" className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-none text-slate-900">
          Learn to Ride.
          <br />
          <span className="text-[#FFB800] relative">
            Ride with
          </span>
          <br />
          Confidence.
        </h1>

        <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-lg">
          Hyderabad's trusted 2-wheeler driving school. Expert instructors, real-road training, and guaranteed license preparation — from complete beginners to road-ready riders.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
          href="#services"
          data-testid="view-courses-button"
          onClick={(e) => {e.preventDefault();document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });}}
          className="inline-flex items-center justify-center gap-2 border-2 border-slate-900 text-slate-900 font-bold px-8 py-4 rounded-xl text-base hover:bg-slate-900 hover:text-white transition-all">

            View Courses
            <ChevronRight size={18} />
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-6 pt-2">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["RK", "PR", "SK"].map((init, i) =>
            <div key={i} className="w-8 h-8 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-xs font-bold text-amber-800">
                  {init}
                </div>
            )}
            </div>
            <div>
              <StarRating count={5} />
              <p className="text-xs text-slate-500 mt-0.5">50+ happy customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Image */}
      <div className="hero-image-animate relative">
        <div className="relative rounded-3xl overflow-hidden shadow-[12px_12px_0px_#FFB800] border-2 border-slate-900 aspect-[4/5]">
          <img
          src="https://images.pexels.com/photos/10081879/pexels-photo-10081879.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Young woman riding a scooter with confidence on a sunny street"
          className="w-full h-full object-cover"
          loading="eager" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Floating card */}
        <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_#FFB800] p-4 min-w-44">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFB800] flex items-center justify-center flex-shrink-0">
              <Award size={20} className="text-black" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">License Success</p>
              <p className="text-2xl font-black text-slate-900">98%</p>
            </div>
          </div>
        </div>

        {/* Floating students badge */}
        <div className="absolute -top-4 -right-4 bg-[#FFB800] rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_#0F172A] p-3 text-center">
          <p className="text-2xl font-black text-black leading-none">50+</p>
          <p className="text-[10px] font-bold text-black/70 uppercase tracking-wide">Customers</p>
        </div>
      </div>
    </div>
  </section>;


/* ─── STATS BAR ─────────────────────────────────────────────────────── */
const StatsBar = () =>
<section data-testid="stats-bar" className="bg-slate-900 py-10">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {STATS.map(({ value, label, icon: Icon }) =>
      <div key={label} className="flex items-center gap-4 group justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFB800] transition-colors">
              <Icon size={22} className="text-[#FFB800] group-hover:text-black transition-colors" />
            </div>
            <div>
              <p className="text-3xl font-black text-white font-heading leading-none">{value}</p>
              <p className="text-sm text-slate-400 mt-0.5">{label}</p>
            </div>
          </div>
      )}
      </div>
    </div>
  </section>;


/* ─── ABOUT ─────────────────────────────────────────────────────────── */
const About = () =>
<section
  id="about"
  data-testid="about-section"
  className="py-24 md:py-32 bg-[#F8FAFC]">

    <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
      {/* Image side */}
      <div className="relative order-2 md:order-1">
        <div className="rounded-3xl overflow-hidden border-2 border-slate-900 shadow-[10px_10px_0px_#FFB800]">
          <img
          src="https://images.pexels.com/photos/3119968/pexels-photo-3119968.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Woman riding a scooter on a city street"
          className="w-full h-80 md:h-[480px] object-cover"
          loading="lazy" />

        </div>
        <div className="absolute top-6 -right-4 md:-right-8 bg-white rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_#FFB800] px-5 py-3">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Based in</p>
          <p className="text-lg font-black text-slate-900">Khajaguda, HYD</p>
        </div>
      </div>

      {/* Text side */}
      <div className="order-1 md:order-2 space-y-6">
        <p className="text-sm uppercase tracking-[0.2em] font-bold text-amber-600">About Us</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Your Trusted Partner on
          <br />
          Every Road Journey
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-slate-600">
          At <strong>Learn and Drive</strong>, we believe that riding a 2-wheeler is a life skill everyone deserves to master safely. Located in the heart of Khajaguda, Hyderabad, we've been training confident riders for years.
        </p>
        <p className="text-base leading-relaxed text-slate-600">
          Our RTO-certified instructors use a structured, step-by-step approach — starting with the basics and progressing to real-road confidence. Whether you're a complete beginner or preparing for your driving license test, we're with you every step of the way.
        </p>
        <ul className="space-y-3 pt-2">
          {[
        "RTO-certified professional instructors",
        "Real-road practice on actual streets",
        "Structured curriculum for all levels",
        "100% safety gear provided"].
        map((item) =>
        <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
              <CheckCircle size={20} className="text-[#10B981] flex-shrink-0" />
              {item}
            </li>
        )}
        </ul>
        <a
        href="tel:9985747111"
        data-testid="about-cta-button"
        className="inline-flex items-center gap-2 bg-[#FFB800] text-black font-bold px-7 py-3.5 rounded-xl shadow-[4px_4px_0px_#0F172A] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">

          <Phone size={17} />
          Call us: 9985747111
        </a>
      </div>
    </div>
  </section>;


/* ─── SERVICES ──────────────────────────────────────────────────────── */
const Services = () =>
<section
  id="services"
  data-testid="services-section"
  className="py-24 md:py-32 bg-[#FDFDFD]">

    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="text-center mb-14">
        <p className="text-sm uppercase tracking-[0.2em] font-bold text-amber-600 mb-3">Our Courses</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          What We Teach
        </h2>
        <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-xl mx-auto">
          Comprehensive 2-wheeler training programs designed for every level — from absolute beginners to license aspirants.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Big card — Basic Riding */}
        <div
        data-testid="service-card-basic-riding"
        className="md:col-span-7 bg-white border-2 border-slate-900 rounded-3xl shadow-[8px_8px_0px_#0F172A] p-8 md:p-12 hover:shadow-[4px_4px_0px_#FFB800] hover:-translate-y-1 transition-all group relative overflow-hidden">

          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full -translate-y-32 translate-x-32 group-hover:bg-amber-100 transition-colors"></div>
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-[#FFB800] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0px_#0F172A]">
                <Bike size={30} className="text-black" />
              </div>
              <div>
                <span className="inline-block bg-[#FFB800] text-black text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                  Most Popular
                </span>
                <h3 className="font-heading text-2xl font-bold text-slate-900">Basic 2-Wheeler Riding</h3>
              </div>
            </div>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Start your riding journey with confidence. Our certified instructors teach you balance, throttle control, braking, and safe maneuvering — perfect for complete beginners. Real-road sessions included from day one.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["Beginner-friendly training", "Balance & control techniques", "Real-road practice sessions", "Safety gear provided"].map((f) =>
            <div key={f} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle size={15} className="text-[#10B981] flex-shrink-0" />
                  {f}
                </div>
            )}
            </div>
            <div className="mt-8">
              <a
              href="#enroll"
              data-testid="service-basic-enroll-btn"
              onClick={(e) => {e.preventDefault();document.querySelector("#enroll")?.scrollIntoView({ behavior: "smooth" });}}
              className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#FFB800] hover:text-black transition-all">

                Enroll Now <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Right — License Prep + Image */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div
          data-testid="service-card-license-prep"
          className="bg-slate-900 border-2 border-slate-900 rounded-3xl shadow-[8px_8px_0px_#FFB800] p-8 hover:shadow-[4px_4px_0px_#0F172A] hover:-translate-y-1 transition-all relative overflow-hidden group">

            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFB800]/10 rounded-full -translate-y-20 translate-x-20 group-hover:bg-[#FFB800]/20 transition-colors"></div>
            <div className="relative">
              <div className="w-14 h-14 bg-[#FFB800] rounded-2xl flex items-center justify-center mb-5">
                <FileText size={26} className="text-black" />
              </div>
              <span className="inline-block bg-white/10 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                High Success Rate
              </span>
              <h3 className="font-heading text-2xl font-bold text-white mb-3">License Preparation</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                Pass your driving license test on the first attempt. We cover all RTO requirements — traffic rules, road signs, and the official test format.
              </p>
              <div className="space-y-2 mb-6">
                {["RTO test preparation", "Traffic rules & road signs", "Mock test sessions", "Document assistance"].map((f) =>
              <div key={f} className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <CheckCircle size={14} className="text-[#FFB800] flex-shrink-0" />
                    {f}
                  </div>
              )}
              </div>
              <a
              href="#enroll"
              data-testid="service-license-enroll-btn"
              onClick={(e) => {e.preventDefault();document.querySelector("#enroll")?.scrollIntoView({ behavior: "smooth" });}}
              className="inline-flex items-center gap-2 bg-[#FFB800] text-black font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-yellow-300 transition-all">

                Enroll Now <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Image card */}
          <div className="rounded-3xl overflow-hidden border-2 border-slate-900 shadow-[6px_6px_0px_#FFB800] flex-1 min-h-36">
            <img
            src="https://images.pexels.com/photos/3119968/pexels-photo-3119968.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Woman riding a scooter - 2-wheeler training"
            className="w-full h-full object-cover object-center"
            loading="lazy" />

          </div>
        </div>
      </div>
    </div>
  </section>;


/* ─── WHY CHOOSE US ─────────────────────────────────────────────────── */
const WhyUs = () =>
<section
  data-testid="why-choose-us-section"
  className="py-24 bg-slate-900 relative overflow-hidden">

    <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFB800]/5 rounded-full -translate-x-48 -translate-y-48"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFB800]/5 rounded-full translate-x-48 translate-y-48"></div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
      <div className="text-center mb-14">
        <p className="text-sm uppercase tracking-[0.2em] font-bold text-amber-400 mb-3">Why Choose Us</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white">
          The Learn & Drive Difference
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {WHY_US.map(({ icon: Icon, title, desc }) =>
      <div
        key={title}
        data-testid={`why-us-card-${title.toLowerCase().replace(/ /g, "-")}`}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-[#FFB800]/10 hover:border-[#FFB800]/30 transition-all group">

            <div className="w-12 h-12 rounded-xl bg-[#FFB800] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Icon size={22} className="text-black" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
          </div>
      )}
      </div>
    </div>
  </section>;


/* ─── REVIEWS ───────────────────────────────────────────────────────── */
const Reviews = () =>
<section
  id="reviews"
  data-testid="reviews-section"
  className="py-24 md:py-32 bg-[#F8FAFC]">

    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="text-center mb-14">
        <p className="text-sm uppercase tracking-[0.2em] font-bold text-amber-600 mb-3">Testimonials</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          What Our Customers Say
        </h2>
        <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-xl mx-auto">
          Real stories from real riders who learned to ride with confidence at Learn and Drive.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <StarRating count={5} />
          <span className="text-slate-700 font-bold">5.0</span>
          <span className="text-slate-500 text-sm">— 50+ happy customers</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {REVIEWS.map((r, i) =>
      <div
        key={r.name}
        data-testid={`review-card-${i}`}
        className="bg-white border-2 border-slate-100 rounded-2xl p-6 hover:border-[#FFB800] hover:shadow-[4px_4px_0px_#FFB800] transition-all">

            <div className="flex items-center gap-4 mb-4">
              <div className={`w-11 h-11 rounded-xl ${r.color} flex items-center justify-center font-black text-sm flex-shrink-0`}>
                {r.initials}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                <p className="text-xs text-slate-500">{r.location}</p>
              </div>
            </div>
            <StarRating count={r.rating} />
            <p className="mt-3 text-slate-600 text-sm leading-relaxed italic">
              "{r.review}"
            </p>
          </div>
      )}
      </div>
    </div>
  </section>;


/* ─── ENROLL FORM ───────────────────────────────────────────────────── */
const EnrollForm = () => {
  const [form, setForm] = useState({ name: "", phone: "", location: "", course: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.location.trim() || !form.course) {
      setErrorMsg("Please fill in all required fields, including your location.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      await axios.post(`${API}/enroll`, form);
      setStatus("success");
      setForm({ name: "", phone: "", location: "", course: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please call us at 9985747111.");
    }
  };

  return (
    <section
      id="enroll"
      data-testid="enroll-section"
      className="py-24 md:py-32 bg-[#FDFDFD]">

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Info */}
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] font-bold text-amber-600 mb-3">
                Enroll Now
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Start Your Riding
                <br />
                Journey Today
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
                Fill in your details and we'll get back to you within a few hours to confirm your slot. Please add your location so we can plan the right batch for you. You can also call us directly at <a href="tel:9985747111" className="font-bold text-[#FFB800] hover:underline">9985747111</a>.
              </p>
            </div>

            {/* Course highlights */}
            <div className="space-y-4">
              {[
              { icon: Bike, title: "Basic 2-Wheeler Riding", desc: "Learn from scratch — balance, control, real roads" },
              { icon: FileText, title: "License Preparation", desc: "Pass RTO test on first attempt, guaranteed" }].
              map(({ icon: Icon, title, desc }) =>
              <div key={title} className="flex items-start gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <div className="w-10 h-10 bg-[#FFB800] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{title}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{desc}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {status === "success" ?
            <div
              data-testid="enroll-success"
              className="bg-green-50 border-2 border-green-200 rounded-3xl p-10 text-center shadow-[6px_6px_0px_#10B981]">

                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PartyPopper size={32} className="text-green-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">
                  Enrollment Submitted!
                </h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Thank you! We've received your enquiry and will call you back shortly to confirm your training slot.
                </p>
                <button
                onClick={() => setStatus("idle")}
                className="bg-[#FFB800] text-black font-bold px-6 py-3 rounded-xl text-sm hover:bg-yellow-300 transition-all">

                  Submit Another Enquiry
                </button>
              </div> :

            <form
              onSubmit={handleSubmit}
              data-testid="enroll-form"
              className="bg-white border-2 border-slate-900 rounded-3xl shadow-[8px_8px_0px_#FFB800] p-8 md:p-10 space-y-5">

                <h3 className="font-heading text-xl font-bold text-slate-900 mb-1">
                  Fill in your details
                </h3>
                <p className="text-sm text-slate-500 mb-2">We'll call you back to confirm your slot. Location is mandatory.</p>

                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Priya Sharma"
                  data-testid="enroll-name-input"
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#FFB800] transition-colors placeholder:text-slate-400" />

                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  data-testid="enroll-phone-input"
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#FFB800] transition-colors placeholder:text-slate-400" />

                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="location">
                    Location / Area <span className="text-red-500">*</span>
                  </label>
                  <input
                  type="text"
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Khajaguda, Hyderabad (required)"
                  required
                  data-testid="enroll-location-input"
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#FFB800] transition-colors placeholder:text-slate-400" />
                  <p className="mt-1.5 text-xs text-slate-500">
                    Required so we can assign the nearest trainer or batch.
                  </p>
                </div>

                {/* Course */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="course">
                    Course Interested In <span className="text-red-500">*</span>
                  </label>
                  <select
                  id="course"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  data-testid="enroll-course-select"
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#FFB800] transition-colors bg-white">

                    <option value="">Select a course...</option>
                    <option value="Basic 2-Wheeler Riding">Basic 2-Wheeler Riding</option>
                    <option value="License Preparation">License Preparation</option>
                    <option value="Both Courses">Both Courses</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="message">
                    Message / Query <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Any questions or preferred timing?"
                  rows={3}
                  data-testid="enroll-message-input"
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#FFB800] transition-colors resize-none placeholder:text-slate-400" />

                </div>

                {/* Error */}
                {(errorMsg || status === "error") &&
              <div data-testid="enroll-error" className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 font-medium">
                    {errorMsg || "Something went wrong. Please try again."}
                  </div>
              }

                {/* Submit */}
                <button
                type="submit"
                disabled={status === "loading"}
                data-testid="enroll-submit-button"
                className="w-full flex items-center justify-center gap-2 bg-[#FFB800] text-black font-bold px-6 py-4 rounded-xl text-base shadow-[4px_4px_0px_#0F172A] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed">

                  {status === "loading" ?
                <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </> :

                <>
                      <Send size={18} />
                      Submit Enquiry
                    </>
                }
                </button>

                <p className="text-xs text-slate-500 text-center">
                  Or call us directly at{" "}
                  <a href="tel:9985747111" className="font-bold text-[#FFB800] hover:underline">
                    9985747111
                  </a>
                </p>
              </form>
            }
          </div>
        </div>
      </div>
    </section>);

};

/* ─── CONTACT ───────────────────────────────────────────────────────── */
const Contact = () =>
<section
  id="contact"
  data-testid="contact-section"
  className="py-24 md:py-32 bg-[#F8FAFC]">

    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="text-center mb-14">
        <p className="text-sm uppercase tracking-[0.2em] font-bold text-amber-600 mb-3">Get In Touch</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Visit Us or Call Today
        </h2>
        <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-xl mx-auto">
          We're located in Khajaguda, Hyderabad. Visit us or just give us a call!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
        {/* Contact Details */}
        <div className="lg:col-span-2 space-y-4">
          <div
          data-testid="contact-phone"
          className="bg-[#FFB800] border-2 border-slate-900 rounded-2xl shadow-[6px_6px_0px_#0F172A] p-6">

            <div className="flex items-center gap-3 mb-2">
              <Phone size={24} className="text-black" />
              <p className="font-black text-black text-lg font-heading">Call Us</p>
            </div>
            <a
            href="tel:9985747111"
            className="text-3xl font-black text-black font-heading tracking-tight hover:underline">

              9985747111
            </a>
            <p className="text-black/70 text-sm mt-1 font-medium">Mon–Sat, 7 AM to 7 PM</p>
          </div>

          <div
          data-testid="contact-address"
          className="bg-white border-2 border-slate-900 rounded-2xl shadow-[6px_6px_0px_#0F172A] p-6">

            <div className="flex items-center gap-3 mb-3">
              <MapPin size={22} className="text-[#FFB800]" />
              <p className="font-black text-slate-900 text-lg font-heading">Our Location</p>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              Road, opp. ASBL, Janmabhoomi Colony,<br />
              Chaitanya Enclave, Khajaguda,<br />
              Makthakousarali, Telangana 500104
            </p>
            <a
            href="https://maps.app.goo.gl/UHqRmVcc8FJLZ7a58"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="directions-link"
            className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-[#FFB800] hover:underline">

              <Navigation size={15} />
              Get Directions on Google Maps
            </a>
          </div>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock size={20} className="text-slate-600" />
              <p className="font-bold text-slate-900">Working Hours</p>
            </div>
            <div className="space-y-1 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Monday – Saturday</span>
                <span className="font-bold text-slate-900">7:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium text-slate-500">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div
        data-testid="contact-map"
        className="lg:col-span-3 rounded-3xl overflow-hidden border-2 border-slate-900 shadow-[8px_8px_0px_#FFB800] min-h-80">

          <iframe
          title="Learn and Drive Location - Khajaguda, Hyderabad"
          src="https://maps.google.com/maps?q=Janmabhoomi+Colony+Chaitanya+Enclave+Khajaguda+Hyderabad+Telangana+500104&output=embed&z=16"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: "400px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
        </div>
      </div>
    </div>
  </section>;


/* ─── FOOTER ────────────────────────────────────────────────────────── */
const Footer = () =>
<footer data-testid="footer" className="bg-slate-900 text-slate-400 py-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#FFB800] flex items-center justify-center">
              <Bike size={20} className="text-black" />
            </div>
            <span className="font-heading text-xl font-black text-white tracking-tight">
              Learn<span className="text-[#FFB800]">&</span>Drive
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
            Hyderabad's trusted 2-wheeler driving school. Expert instructors, real-road training, guaranteed results.
          </p>
        </div>

        <div>
          <p className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Quick Links</p>
          <div className="space-y-2">
            {NAV_LINKS.map((link) =>
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {e.preventDefault();document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });}}
            className="block text-sm text-slate-400 hover:text-[#FFB800] transition-colors">

                {link.label}
              </a>
          )}
          </div>
        </div>

        <div>
          <p className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Contact</p>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Phone size={15} className="text-[#FFB800] mt-0.5 flex-shrink-0" />
              <a href="tel:9985747111" className="hover:text-[#FFB800] transition-colors">9985747111</a>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={15} className="text-[#FFB800] mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Road, opp. ASBL, Janmabhoomi Colony, Chaitanya Enclave, Khajaguda, Telangana 500104
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Learn and Drive. All rights reserved.</p>
        <p>2-Wheeler Driving School | Khajaguda, Hyderabad, Telangana</p>
      </div>
    </div>
  </footer>;


/* ─── APP ───────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="font-body">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Services />
        <WhyUs />
        <Reviews />
        <EnrollForm />
        <Contact />
      </main>
      <Footer />
    </div>);

}
