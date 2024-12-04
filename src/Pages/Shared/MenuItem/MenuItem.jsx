import React from 'react';

const MenuItem = ({ item }) => {
    const { name, recipe, image, price } = item;
    return (
        <div className='flex space-x-4'>
            <img style={{ borderRadius: '0 200px 200px 200px' }} className='w-28' src={image} alt="" />
            <div>
                <h3 className='uppercase font-semibold'>{name} ----------</h3>
                <p>{ recipe}</p>
            </div>
            <p className='text-yellow-800'>${price}</p>
        </div>
    );
};

export default MenuItem;