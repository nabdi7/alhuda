import React from "react";
import { Phone, MapPin } from "lucide-react";

const Cta = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
            <div>
              <h2 className="text-2xl font-medium mb-2">Need Assistance?</h2>
              <p className="text-emerald-50">
                We&apos;re here to help you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+12536322310"
                className="flex items-center gap-2 bg-white text-emerald-900 px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
              <a
                href="https://maps.app.goo.gl/R3mQDRYq1TF4rcAf6"
                className="flex items-center gap-2 bg-emerald-800 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors border border-emerald-700"
              >
                <MapPin className="h-5 w-5" />
                Our Location
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;

