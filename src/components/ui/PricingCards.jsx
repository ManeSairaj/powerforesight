"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function PricingCards() {
  const [purchasedTier, setPurchasedTier] = useState(null);

  const tiers = [
    {
      name: "Standard",
      price: "Rs 1000",
      description: "Perfect for small teams and startups",
      features: [
        "Live Energy consumption",
        "10GB storage",
        "Basic support",
        "Insights",
      ],
      icon: Zap,
    },
    {
      name: "Premium",
      price: "Rs 1600",
      description: "For growing businesses and power users",
      features: [
        "Live Energy consumption",
        "100GB storage",
        "Priority support",
        "Insights",
        "Advanced analytics",
        "Weather Forecasting",
      ],
      icon: Star,
    },
  ];

  const handlePurchase = (tierName) => {
    setPurchasedTier(tierName);
    setTimeout(() => setPurchasedTier(null), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 p-12 bg-blue-600">
      {tiers.map((tier) => (
        <Card key={tier.name} className="w-full md:w-96 flex flex-col relative bg-white text-black">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-blue-600">{tier.name}</CardTitle>
              <tier.icon
                className={`w-9 h-9 ${
                  tier.name == "Standard"
                    ? "text-blue-600"
                    : "text-yellow-300 drop-shadow(0 0 2px #3b82f6)"
                }`}
              />
            </div>
            <CardDescription className="text-xl font-semibold text-blue-600">
              {tier.price}/month
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-gray-600 mb-4">{tier.description}</p>
            <ul className="space-y-2">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => handlePurchase(tier.name)}
            >
              {purchasedTier === tier.name ? "Thank You!" : "Purchase"}
            </Button>
          </CardFooter>
          {purchasedTier === tier.name && (
            <motion.div
              className="absolute top-0 left-0 inset-0 bg-blue-600 bg-opacity-20 rounded-lg h-full w-full z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <motion.div
                className="w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Zap className="w-28 h-28 text-yellow-400" />
              </motion.div>
            </motion.div>
          )}
        </Card>
      ))}
    </div>
  );
}
