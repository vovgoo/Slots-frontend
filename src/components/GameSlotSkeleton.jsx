import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function GameSlotSkeleton() {
    return (
        <div className="slot__item">
            <Skeleton />
        </div>
    );
}

export default GameSlotSkeleton;
