import React from 'react'
import { FaHeadset, FaTruck } from 'react-icons/fa'
import { FaArrowRotateLeft, FaShield } from 'react-icons/fa6'

export default function Pros() {

  const items = [
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
      color: "blue"
    },
    {
      icon: <FaShield />,
      title: "Secure Payment",
      desc: "100% protected payments",
      color: "green"
    },
    {
      icon: <FaArrowRotateLeft />,
      title: "Easy Returns",
      desc: "14-day return policy",
      color: "orange"
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Dedicated support team",
      color: "purple"
    }
  ]

  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {items.map((item, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 p-4 
              bg-white dark:bg-gray-800 
              rounded-2xl border border-gray-100 dark:border-gray-700
              shadow-sm hover:shadow-lg 
              transition-all duration-300 hover:-translate-y-1"
            >

              {/* Icon */}
              <div
                className={`w-12 h-12 flex items-center justify-center 
                rounded-xl text-lg 
                bg-${item.color}-100 text-${item.color}-600
                dark:bg-${item.color}-900/30 dark:text-${item.color}-400
                transition-transform duration-300 group-hover:scale-110`}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}