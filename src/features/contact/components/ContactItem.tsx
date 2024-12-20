import Image from "next/image";

type ContactItemProps = {
  contact: {
    id: number;
    title: string;
    status: string;
    author: string;
    date: string;
    photos: string[];
  };
};

function ContactItem({ contact }: ContactItemProps) {
  const maxPhotos = 4;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md my-4">
      <div className="flex items-center mb-2">
        <h2 className="font-bold text-lg">
          <span className="text-yellow-500">Q.</span> {contact.title}
        </h2>
        <div
          className={`py-1 px-2 ml-auto text-sm rounded-lg border ${
            contact.status === "답변 완료"
              ? "bg-primary-1 text-btn-color border border-primary-3"
              : "bg-gray-1 text-gray-6"
          }`}
        >
          {contact.status}
        </div>
      </div>

      {/* 사진이 있는 경우 */}
      {contact.photos.length > 0 && (
        <div className="flex items-center gap-2 mb-2">
          {contact.photos.slice(0, maxPhotos).map((photo, index) => (
            <div
              key={index}
              className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-2"
            >
              <Image
                src={photo}
                alt={`photo-${index}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* 작성자 정보 */}
      <div className="text-sm text-gray-600 flex items-center gap-1">
        <span>{contact.author}</span> |{" "}
        <span className="text-gray-4">작성일: {contact.date}</span>
      </div>
    </div>
  );
}

export default ContactItem;
