import { createRoot } from 'react-dom/client';

import MovingNetworkAnimation from 'moving-network-animation';
import { Parallax, Background } from 'react-parallax';

export default function Pentagons({ parallax, file, blur }: { parallax: number, file: string, blur: number }) {
    return <Parallax blur={0} strength={parallax} bgImage={file} className={`h-full overflow-x-visible ${blur}`} />;
}

const blurs = [
    'blur-none',
    'blur-sm',
    'blur-md',
    'blur-xl'
]

Array(4).fill(0).forEach((_, i) => {
    const root = createRoot(document.getElementById(`pentagons-${i+1}`));
    root.render(<Pentagons parallax={i * 200} file={`img/pentagons-${i+1}.svg`} blur={blurs[i]} />);
});
