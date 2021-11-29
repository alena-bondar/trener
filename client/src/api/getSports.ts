import KinsOfSports from '../types/kindsOfSports';

async function getData(getKinsOfSports: any, setKindsOfSport: any, localKinsOfSports: KinsOfSports[]): Promise<KinsOfSports> {
    return getKinsOfSports()
        .then((result: {data: KinsOfSports}) => {
            setKindsOfSport(result.data)
        })
        .catch(() => {
            setKindsOfSport(localKinsOfSports)
        });
}

export default getData;
