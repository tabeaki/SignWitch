import Link from 'next/link';

 function Footer() {
     return <footer className="bg-[#17F46D]">
     <div className="bg-[url('/footer.png')]  bg-center bg-no-repeat bg-cover">
      <div className='grid grid-cols-4 lg:grid lg:grid-cols-12 lg:gap-12'>
        <div className='px-1 pb-2 text-[#17F46D]'><a href="">1</a></div>
        <div className='px-3 pb-2 text-[#17F46D]'><a href="">2</a></div>
      </div>
     </div>
   </footer>;
   }

   export default Footer;