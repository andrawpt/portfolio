import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useColorTheme } from "@/contexts/ColorThemeContext";
import {
  IconX,
  IconMail,
  IconPhone,
  IconWorld,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconDownload,
  IconCopy,
  IconCheck,
} from "@tabler/icons-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL = "andrawpt@gmail.com";
const PHONE = "+62 878-5622-5503";

const SOCIALS = [
  {
    label: "Website",
    icon: <IconWorld className="w-5 h-5" />,
    href: "https://andrawpt.com",
    username: "andrawpt.com",
  },
  {
    label: "LinkedIn",
    icon: <IconBrandLinkedin className="w-5 h-5" />,
    href: "https://linkedin.com/in/andrapwpt",
    username: "andrapwpt",
  },
  {
    label: "GitHub",
    icon: <IconBrandGithub className="w-5 h-5" />,
    href: "https://github.com/andra-wp",
    username: "@andra-wp",
  },
  {
    label: "Instagram",
    icon: <IconBrandInstagram className="w-5 h-5" />,
    href: "https://instagram.com/andrawpz",
    username: "@andrawpz",
  },
];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { theme } = useColorTheme();
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PHONE);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 25, filter: "blur(12px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black tracking-tighter text-neutral-800 dark:text-neutral-100 font-mono">
                  Get in Touch
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <IconX className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-5"
              >
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Email
                </p>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center gap-3">
                    <IconMail className="w-5 h-5 shrink-0" style={{ color: theme.primary }} />
                    <span className="font-mono text-sm text-neutral-700 dark:text-neutral-300">
                      {EMAIL}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopyEmail}
                    className="ml-2 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors shrink-0"
                    title="Copy email"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <IconCheck className="w-4 h-4" style={{ color: theme.primary }} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <IconCopy className="w-4 h-4 text-neutral-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="mb-5"
              >
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Phone / WhatsApp
                </p>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <a
                    href={`tel:${PHONE.replace(/\s+/g, "")}`}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  >
                    <IconPhone className="w-5 h-5 shrink-0" style={{ color: theme.primary }} />
                    <span className="font-mono text-sm text-neutral-700 dark:text-neutral-300">
                      {PHONE}
                    </span>
                  </a>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopyPhone}
                    className="ml-2 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors shrink-0"
                    title="Copy phone number"
                  >
                    <AnimatePresence mode="wait">
                      {copiedPhone ? (
                        <motion.div
                          key="check-phone"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <IconCheck className="w-4 h-4" style={{ color: theme.primary }} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy-phone"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <IconCopy className="w-4 h-4 text-neutral-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-7"
              >
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Socials
                </p>
                <div className="flex flex-col gap-1">
                  {SOCIALS.map((s, i) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.06 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group"
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${theme.primary}25` }}
                      >
                        <div style={{ color: theme.primary }}>{s.icon}</div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
                          {s.label}
                        </p>
                        <p className="text-xs text-neutral-400">{s.username}</p>
                      </div>
                      <span className="ml-auto text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors text-lg leading-none">
                        →
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.a
                href="/cv.pdf"
                download
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-bold font-mono tracking-tight text-base"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 8px 28px ${theme.glow}`,
                }}
              >
                <IconDownload className="w-5 h-5" />
                Download CV
              </motion.a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
