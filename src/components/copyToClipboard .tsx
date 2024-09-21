import toast from 'react-hot-toast';

export const copyToClipboard = (textToCopy: any) => {
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      toast.success('Copied');
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
    });
};
