'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Range } from 'react-date-range';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';

import { Container } from '@/app/components/Container';
import ListingHead from '@/app/components/Listings/ListingHead';
import ListingInfo from '@/app/components/Listings/ListingInfo';
import { categories } from '@/app/components/Navbar/Categories';
import useLoginModal from '@/app/hooks/useLoginModal';
import ListingReservation from '@/app/components/Listings/ListingReservation';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = (
  {
    listing,
    reservations = [],
    currentUser,
  }) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState('');
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [activeOffer, setActiveOffer] = useState(0);


  const handleKhaltiPayment = useCallback(async () => {
    toast.success('Khalti');
    const payload = {
      'return_url': `${process.env.NEXT_PUBLIC_KHALTI_RETURN_URL}/payment-success`,
      'website_url': `${process.env.NEXT_PUBLIC_KHALTI_RETURN_URL}`,
      'amount': totalPrice * 100,
      'purchase_order_id': `${listing?.id}_${new Date(Date.now())}`,
      'purchase_order_name': 'test',
      'customer_info': {
        'name': `${currentUser?.name}`,
        'email': `${currentUser?.email}`,
        'phone': `000000000`
      },
    };
    console.log(payload);
    await axios.post('/api/khalti', payload)
      .then(async (res) => {
        console.log(res.data.data);
        router.push(`${res.data.data.payment_url}`);
        // window.location.href = `${res.data.data.payment_url}`;
      });
  }, [currentUser, listing?.id, router, totalPrice]);


  const onCreateReservation = useCallback(
    async () => {
      if (!currentUser) return loginModal.onOpen();
      setIsLoading(true);
      if (currentUser.role === 'admin') {
        toast.error('Admin cannot book');
        setIsLoading(false);
        return;
      }

      await axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
        specialRequests: requests,
      }).then(async () => {
        toast.success('Listing Reserved');
        setDateRange(initialDateRange);
        // Redirect to "/trips"
        await handleKhaltiPayment();
        // setTimeout(() => {
        //   // router.push('/trips');
        // }, 200);
      }).catch((error) => {
        toast.error('Something Went Wrong');
      }).finally(() => {
        setIsLoading(false);
      });
    },
    [currentUser, loginModal, handleKhaltiPayment, totalPrice, dateRange.startDate, dateRange.endDate, listing?.id, router, requests],
  );

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.price) {
        let offerPrice = listing.price;
        if (activeOffer > 0) {
          offerPrice = (listing.price - (listing.price * activeOffer / 100));
        }
        setTotalPrice((dayCount * offerPrice));
      } else {
        setTotalPrice(listing.price);
      }
    }
    fetchOffers();
  }, [dateRange.endDate, dateRange.startDate, listing.price, totalPrice]);

  const fetchOffers = async () => {
    try {
      const response = await axios.get('/api/offers');
      setActiveOffer(response.data.offer.price);
    } catch (error) {
      toast.error("Could not fetch offers")
    }
  }

  // fetching category
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="relative">

        <div className="max-w-screen-lg mx-auto pt-6">
          <div className="flex flex-col gap-6">
            <ListingHead
              title={listing.title}
              imageSrc={listing.imageSrc}
              // locationValue={listing.locationValue}
              id={listing.id}
              currentUser={currentUser}
            />
            <div
              className="
            grid
            grid-cols-1
            md:grid-cols-7
            md:gap-6
            mt-6
            "
            >
              <ListingInfo
                user={listing.user}
                description={listing.description}
                category={category}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
              />
              <div
                className="
              order-first
              mb-10
              md:order-last
              md:col-span-3
              ">
                <ListingReservation
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  specialRequests={(requests) => setRequests(requests)}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                />
              </div>
            </div>
          </div>
        </div>
        {activeOffer > 0 && (
          <div style={{ zIndex: 9999 }} className='absolute px-2 py-3 text-white bottom-[40px] right-[20px] bg-green-400'>
            <span>{activeOffer} % Off on all rooms</span>
          </div>)}
      </div>
    </Container>
  );
};
export default ListingClient;
