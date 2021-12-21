import { Text } from 'components';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Generate = () => {
    const router = useRouter();
    const { addresses } = router.query;

    console.log(router)
    console.log(`id: ${addresses}`);

    return (
        <>
        <Text>{addresses}</Text>
        </>
    );
}

export default Generate;