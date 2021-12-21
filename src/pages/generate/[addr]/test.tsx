import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Generate = () => {
    const router = useRouter();
    // console.log(router);

    useEffect(() => {
        // if(router.query) {
        //     id = router
        // }

        console.log(router);
        console.log('1');
    }, [router.query]);

    // console.log(router);
    // console.log('testtttt');

    return (
        <>
        </>
    );
}

export default Generate;