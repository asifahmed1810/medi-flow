import React, { useState } from 'react';
import JoinCampModal from '../JoinCampModal/JoinCampModal';

const AvailableCamps = () => {
    const [isModalVisible,setIsModalVisible]=useState(false);
    const toggleModal=()=>{
        setIsModalVisible(!isModalVisible);
    }
    return (
        <div className='min-h-screen'>


            <button onClick={toggleModal} className="px-4 mt-20 py-2 bg-blue-500 text-white rounded">show</button>

            {isModalVisible && <JoinCampModal toggleModal={toggleModal}></JoinCampModal>}
            
        </div>
    );
};

export default AvailableCamps;