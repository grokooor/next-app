"use client";

const Player = ({ url }: { url: string }) => {
  return (
    <div className="min-h-96">
      <iframe
        id="player-iframe"
        src={url}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
        allowFullScreen
        className={"aspect-auto min-h-96 w-full rounded-2xl"}
      ></iframe>
    </div>
  );
};

export default Player;
