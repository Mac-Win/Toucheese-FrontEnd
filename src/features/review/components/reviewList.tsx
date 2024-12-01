import Image from "next/image";
import Link from "next/link";

interface Review {
  id: number;
  firstImage: string;
}

interface ReviewListProps {
  reviews: Review[]; // 리뷰 데이터 배열
}

function ReviewList({ reviews }: ReviewListProps) {
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
