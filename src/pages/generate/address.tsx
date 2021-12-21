import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Generate = () => {
    const router = useRouter();
    const { id } = router.query;

    // useEffect(() => {
    //     // if(router.query) {
    //     //     id = router
    //     // }

    //     console.log(router);
    //     console.log('1');
    // }, [router.query]);


    console.log(`id: ${id}`);

    // console.log(router);
    // console.log('testtttt');

    return (
        <>
        </>
    );
}

export default Generate;3