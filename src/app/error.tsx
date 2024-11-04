"use client";

const ErrorPage = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-6">
      <h2 className="text-xl">Something bad happened</h2>
      <p className="text-sm">Please try again later</p>
    </div>
  );
};

export default ErrorPage;
