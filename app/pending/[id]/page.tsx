"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/mainheader";
import Spin from "@/components/spin";
import Image from "next/image";

interface Review {
  _id: string;
  productId: string;
  changes: {
    productName?: string;
    price?: string;
    image?: string;
    productDescription?: string;
    department?: string;
  };
  status: string;
  author: string;
  adminId?: string;
}

const ReviewDetailsPage = ({ params }: { params: { id: string } }) => {
  const [review, setReview] = useState<Review | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch(`/api/pending/${params.id}`);
        const data = await res.json();
        setReview(data);
      } catch (error) {
        console.error("Error fetching review details:", error);
      }
    };
    fetchReview();
  }, [params.id]);

  const handleUpdateStatus = async (status: "approved" | "rejected") => {
    try {
      const response = await fetch(`/api/reviews/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        alert(`Review ${status} successfully`);
        router.push("/pending");
      } else {
        const errorData = await response.json();
        alert(`Failed to ${status} review: ${errorData.message}`);
      }
    } catch (error) {
      console.error(`Error ${status} review:`, error);
      alert(`An error occurred while ${status} the review`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-800 via-purple-500 to-pink-400">
      <Header />

      <div className="p-6  min-h-screen">
        {review ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
              Review Details
            </h1>
            <h2 className="text-md font-semibold mb-4 text-center text-gray-700">
              Review by {review.author}
            </h2>
            {review.changes.image && (
              <div className="mb-4">
                <Image
                  width={300}
                  height={400}
                  src={review.changes.image}
                  alt={`Review by ${review.author}`}
                  className="w-full h-64 object-contain transition-transform duration-200 hover:scale-105"
                />
              </div>
            )}
            <div className="mb-6">
              {Object.entries(review.changes).map(([key, value]) => (
                <div key={key} className="mb-2 p-2 border-b border-gray-200">
                  <span className="font-semibold capitalize">{key}:</span>
                  <span className="ml-2 text-gray-600">
                    {value || "Not changed"}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleUpdateStatus("approved")}
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-200"
              >
                Approve
              </button>
              <button
                onClick={() => handleUpdateStatus("rejected")}
                className="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600 transition duration-200"
              >
                Reject
              </button>
            </div>
          </div>
        ) : (
          <div className="justify-center items-center flex flex-col min-h-screen">
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewDetailsPage;
