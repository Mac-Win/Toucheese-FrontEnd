import Image from "next/image";
import Link from "next/link";
import { Review } from "@/types/Review.type";

function ReviewList({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return <div>현재 리뷰가 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {reviews.map((review) => (
        <Link href={`/review/${review.id}`} key={review.id}>
          <div className="relative w-full overflow-hidden aspect-square cursor-pointer">
            <Image
              src={review.firstImage}
              alt={`Review ${review.id}`}
              className="object-cover w-full h-full hover:scale-105 transition-all duration-200"
              fill
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ReviewList;
