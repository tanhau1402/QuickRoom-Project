import React, { useContext, useState } from 'react';
import { ContextTypeBusiness } from '../../context/TypeContext';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
function BookingPage(props) {
  const listType = useContext(ContextTypeBusiness);
  const [typeId, setTypeId] = useState(null);

  return (
    <div>
      <p className='text-3xl text-center font-semibold p-4'>Điều nào sau đây mô tả chính xác nhất về <br /> chỗ ở của bạn?</p>
      <div className='grid grid-cols-1 text-center mx-auto  md:grid-cols-3 gap-3 lg:grid-cols-3 container w-[40vw]'>

        {listType.map((type) => (
          <div onClick={() => setTypeId(type.id)} className={`warp border  rounded-xl mx-auto w-full h-full p-3 ${type.id == typeId ? " bg-red-400 text-white" : ""}`}>
            <div className="icon">
              <i className={type.icon}></i>
            </div>
            <div className="des">
              {type.des}
            </div>
          </div>
        )
        )}

      </div>
      <div className={`action text-center mt-5 ${typeId ? "" : "hidden"}`}>
        <Link to={`/roominfo/${typeId}`}>
          <Button
            sx={{ padding: "10px" }}
            variant="contained"
            color="primary"
          >
            Bước tiếp theo
          </Button>
        </Link>
      </div>
      <hr className='mt-5 mb-5' />
    </div>
  );
}

export default BookingPage;