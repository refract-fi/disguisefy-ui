import useRequest from './useRequest';

export default function useDisguise(id) {
    return useRequest<any>({
        url: '/api/disguise',
        params: { id }
      })
}