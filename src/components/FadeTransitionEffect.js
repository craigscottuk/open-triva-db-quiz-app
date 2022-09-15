import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 Wraps around FadeTransition to create enter/exit transitions for each quiz question, and finally the transition to the the game's end screen.
 */

function FadeWrapper({ children }) {
  return <AnimatePresence exitBeforeEnter={true}>{children}</AnimatePresence>;
}

/**
 Wraps children (quiz questions and the end screen) in an animated div that is set to fade in and out.
**/

function FadeTransition({ children }) {
  return (
    <motion.div
      key={children.key}
      initial={{ opacity: 0, y: 4, transition: { ease: 'easeIn' } }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -500, transition: { ease: 'easeIn' } }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export { FadeWrapper, FadeTransition };
