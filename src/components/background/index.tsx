import Stars from './stars';

function Background() {
  return (
    <div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_2px)] bg-[size:74px_94px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="absolute bottom-0 left-[-10%] right-0 top-[50%] -z-10 size-[1700px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(90,90,255,.25),rgba(255,255,255,0))] md:left-[-90%] lg:left-[-20%]"></div>
      <div className="absolute bottom-0 right-[-110%] top-[-10%] -z-10 size-[1300px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(80,80,255,.18),rgba(255,255,255,0))] md:right-[-90%] lg:right-[-20%]"></div>
      <Stars count={80} />
    </div>
  );
}

export default Background;
