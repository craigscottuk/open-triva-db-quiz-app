import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Wraps around a FadeTransition. FadeTransition is used inside FadeWrapper to create enter and exit transitions for each question.
 * @param {object} props
 * @param {React.Node} props.children
 */

function FadeWrapper({ children }) {
  return <AnimatePresence exitBeforeEnter={true}>{children}</AnimatePresence>;
}

/**
 * Wraps children in an animated div that is set to fade in and out.
 * @param {object} props
 * @param {React.Node} props.children
 */

function FadeTransition({ children }) {
  return (
    <motion.div
      key={children.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export { FadeWrapper, FadeTransition };
