"use client";

import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHeadset,
  FaPaperPlane,
  FaCircleQuestion,
} from "react-icons/fa6";
import Link from "next/link";

export default function ContactSection() {
  return (
    <div className="dark:bg-gray-600 bg-white">
    <div className="container mx-auto px-4 py-12 text-gray-900 dark:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-1 space-y-6">
          {/* CARD */}
          {[
            {
              icon: FaPhone,
              title: "Phone",
              desc: "Mon-Fri from 8am to 6pm",
              content: "+1 (800) 123-4567",
              link: "tel:+18001234567",
            },
            {
              icon: FaEnvelope,
              title: "Email",
              desc: "We'll respond within 24 hours",
              content: "support@freshcart.com",
              link: "mailto:support@freshcart.com",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                  <item.icon className="text-green-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {item.desc}
                  </p>

                  <a href={item.link} className="text-green-600 font-medium">
                    {item.content}
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* LOCATION */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                <FaLocationDot className="text-green-600" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Office
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  123 Commerce Street <br />
                  New York, NY 10001 <br />
                  United States
                </p>
              </div>
            </div>
          </div>

          {/* HOURS */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                <FaClock className="text-green-600" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Business Hours
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Monday - Friday: 8am - 6pm <br />
                  Saturday: 9am - 4pm <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Follow Us
            </h3>

            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full 
                    bg-gray-100 dark:bg-gray-700 
                    flex items-center justify-center 
                    text-gray-500 dark:text-gray-300 
                    dark:hover:bg-green-600
                    hover:bg-green-600 hover:text-white transition"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* FORM */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                <FaHeadset className="text-green-600" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Send us a Message
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Fill out the form and we&apos;ll get back to you
                </p>
              </div>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* INPUT */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl border 
                    border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-900
                    text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-xl border 
                    border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-900
                    text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  />
                </div>
              </div>

              <select
                className="w-full px-4 py-3 rounded-xl border 
                border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-900
                text-gray-900 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              >
                <option>Select a subject</option>
                <option>General Inquiry</option>
                <option>Order Support</option>
              </select>

              <textarea
                rows={5}
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-xl border 
                border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-900
                text-gray-900 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all resize-none"
              />

              <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-sm shadow-green-600/20">
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>

          {/* HELP BOX */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-2xl p-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm">
                <FaCircleQuestion className="text-green-600" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Looking for quick answers?
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Check our help center for common questions.
                </p>

                <Link
                  href="/contact"
                  className="text-green-600 font-medium hover:underline"
                >
                  Visit Help Center →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}