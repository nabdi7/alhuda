import React from "react";
import PageHeader from "../header/PageHeader";

const AnnouncementPage = () => {
  return (
    <section className="">
      <PageHeader title="Announcements" breadcrumb="Announcements" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-24">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              No New Announcements
            </h2>
            <p className="text-green-600 max-w-xl mx-auto">
              Check back soon for updates from our community.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AnnouncementPage;
