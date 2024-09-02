"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/mainheader";
import Image from "next/image";

const PendingRequestsPage = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/pending");
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-800 via-purple-500 to-pink-400">
      <Header />
      <div className="p-6  min-h-screen">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          Pending Requests
        </h1>
        {reviews.length === 0 ? (
          <p className="text-center text-lg text-white">No pending requests</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <li
                key={review._id}
                className="bg-white/90 rounded-lg shadow-md p-4 flex flex-col"
              >
                {review.changes.image && (
                  <div className="h-48 overflow-hidden mb-4">
                    <Image
                      src={review.changes.image}
                      alt={`Review by ${review.author}`}
                      width={300}
                      height={400}
                      className="w-full h-full object-contain transition-transform duration-200 hover:scale-105"
                    />
                  </div>
                )}
                <h2 className="text-xl font-semibold mb-2">
                  Review by {review.author}
                </h2>
                <p className="text-gray-700 mb-4">
                  {review.changes.productDescription ||
                    "No description available."}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">
                    Price: ${review.changes.price}
                  </span>
                  <button
                    onClick={() => router.push(`/pending/${review.id}`)}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-200"
                  >
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PendingRequestsPage;
