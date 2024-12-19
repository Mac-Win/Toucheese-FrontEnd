import ContactItem from "../components/ContactItem";
import ContactNewButton from "../components/ContactNewButton";

const dummyData = [
  {
    id: 1,
    title: "제목을 입력해주세요.",
    status: "답변 완료",
    author: "홍길동",
    date: "24.12.16",
    photos: [
      "/gallery/gallery1.png",
      "/gallery/gallery4.png",
      "/gallery/gallery2.png",
      "/gallery/gallery3.png",
    ],
  },
  {
    id: 2,
    title: "제목을 입력해주세요.",
    status: "답변 대기",
    author: "홍길동",
    date: "24.12.16",
    photos: [],
  },
];

function ContactList() {
  return (
    <div className="relative">
      {/* dummyData를 map으로 반복 렌더링 */}
      {dummyData.map((item) => (
        <ContactItem key={item.id} contact={item} />
      ))}
      <ContactNewButton />
    </div>
  );
}

export default ContactList;
