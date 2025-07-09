import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import AlertCard from './AlertCard';
import CloseIcon from '@mui/icons-material/Close'; // можно использовать любую иконку или текст
import config from '../../config';

export default function AlertsGallery() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  useEffect(() => {
    fetch(`${config.backendUrl}/api/images/images`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setData)
      .catch(() => setData([]));
  }, []);

  const pureData = data.filter((x) => x.alerts && x.alerts.length > 0 && x.alerts[0]);

  const handleOpenImage = (url) => {
    setSelectedImageUrl(url);
    setModalOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Фото с предупреждениями
      </Typography>
      <Grid container spacing={3} alignItems="stretch">
        {pureData.map((file) => (
          <Grid item xs={12} sm={6} md={4} key={file.source} display="flex">
            <AlertCard
              file={{
                ...file,
                markupedUrl: `${config.backendUrl}/data/markuped_images/${file.markuped}`,
              }}
              onOpenMarkup={() =>
                handleOpenImage(
                  `${config.backendUrl}/data/markuped_images/${file.markuped}`
                )
              }
            />
          </Grid>
        ))}
      </Grid>

      {/* Модальное окно */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflowY: 'visible'
          },
        }}
        BackdropProps={{
          style: {
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <DialogContent>
          {selectedImageUrl && (
            <img
              src={selectedImageUrl}
              alt="Разметка"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModalOpen(false)}
            color="primary"
            startIcon={<CloseIcon />}
            variant="contained"
            sx={{ alignSelf: 'center' }}
          >
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}