"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useProductStore } from "@/store/useProductStore";
import Image from "next/image";

const CheckoutPage = () => {
  const products = useProductStore((state) => state.products);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif ">Complete Your Order</h1>
          <p className="mt-2 text-gray-600">
            Review your details and pay securely
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl shadow-sm border ">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Product List */}
                {products.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between py-4"
                    >
                      <div className="flex items-center space-x-4">
                        {/* <img 
                          src={product.image_url} 
                          alt={product.name} 
                          className="w-15 h-20 object-cover rounded-lg" 
                          onError={(e) => (e.currentTarget.src = '/placeholder-image.jpg')}
                        /> */}
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          className="w-15 h-20 object-cover rounded-lg"
                          onError={(e) =>
                            (e.currentTarget.src = "/placeholder-image.jpg")
                          }
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {product.size?.[0] && `Size: ${product.size[0]} | `}
                            {product.color?.[0] && `Color: ${product.color[0]}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No products in cart
                  </p>
                )}

                <Separator className="my-4" />

                {/* Subtotal, Shipping, Total */}
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium">
                      $
                      {products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-gray-400 pt-3">
                    <span>Total</span>
                    <span>
                      $
                      {products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Have a promo code?
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1"
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            {/* Card */}
            <Card className="rounded-2xl shadow-sm border ">
              <CardHeader>
                <CardTitle className="text-xl">Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <Input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry
                      </label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <Input type="text" placeholder="123" className="w-full" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>

                  <Button className="w-full py-6 rounded-xl">
                    Pay $
                    {products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
