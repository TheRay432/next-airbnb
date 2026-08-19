import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import BaseCotainer from '@/components/Custom/BaseCotainer/BaseCotainer';
import { getRoomById, getRoomDetail, ROOM_SECTION } from '@/lib/constant/rooms';
import RoomHeader from './components/RoomHeader';
import RoomGallery from './components/RoomGallery';
import RoomSummary from './components/RoomSummary';
import RoomHost from './components/RoomHost';
import RoomDescription from './components/RoomDescription';
import RoomAmenities from './components/RoomAmenities';
import RoomCalendar from './components/RoomCalendar';
import RoomReviews from './components/RoomReviews';
import RoomBooking from './components/RoomBooking';
import RoomNav from './components/RoomNav';

interface RoomDetailProps {
  params: { id: string };
}

const RoomDetail = ({ params }: RoomDetailProps) => {
  const room = getRoomById(params.id);

  if (!room) {
    notFound();
  }

  const detail = getRoomDetail(room);

  return (
    <>
      <div className="bg-white shadow-md">
        <Navbar />
      </div>
      <RoomNav room={room} />
      <BaseCotainer>
        <div className="max-w-[1120px] mx-auto pb-24 lg:pb-8">
          <RoomHeader room={room} />
          <div id={ROOM_SECTION.gallery}>
            <RoomGallery room={room} />
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-x-20">
            <div className="w-full lg:w-7/12">
              <RoomSummary room={room} host={detail.host} />
              <RoomHost host={detail.host} />
              <RoomDescription description={detail.description} />
              <div id={ROOM_SECTION.amenities}>
                <RoomAmenities amenities={detail.amenities} />
              </div>
            </div>
            <RoomBooking room={room} />
          </div>
          <div id={ROOM_SECTION.calendar}>
            <RoomCalendar />
          </div>
          <div id={ROOM_SECTION.reviews}>
            <RoomReviews
              room={room}
              ratingScores={detail.ratingScores}
              allReviews={detail.allReviews}
            />
          </div>
        </div>
      </BaseCotainer>
      <Footer />
    </>
  );
};

export default RoomDetail;
