import React from "react";
import ShareScoreboard from "shared/src/components/shareScoreboard/ShareScoreboard";
import { AuthCheck, useUser } from "reactfire";
import "firebase/auth";

const ShareScoreboardContainer = () => {
  const user = useUser();
  const userid = user ? user.uid : "0";
  const shareableLink = window.location.origin + "/" + userid;
  return (
    <AuthCheck fallback={null}>
      <ShareScoreboard link={shareableLink} />
    </AuthCheck>
  );
};

export default ShareScoreboardContainer;
