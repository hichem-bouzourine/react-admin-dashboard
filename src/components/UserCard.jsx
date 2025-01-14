import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../axios/axios";
import { tokens } from "../theme";

const UserCard = ({ user, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    nom,
    prenom,
    date_de_naissance,
    date_inscription,
    sexe,
    email,
    telephone,
    type,
    photo,
  } = user;

  const deleteUser = async (id) => {
    await axios.delete(`/admin/users/${id}`).catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <Card>
        <CardHeader
          title={`${nom} ${prenom}`}
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Grid container justifyContent={"space-around"} spacing={2}>
            <Grid item xs={12} sm={5}>
              {!photo && <CircularProgress color="success" />}
              {photo && (
                <img
                  src={photo}
                  alt={`${nom} ${prenom}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "600px",
                    marginBottom: "16px",
                  }}
                />
              )}
            </Grid>

            <Grid item xs={12} sm={7}>
              <Typography variant="subtitle1" gutterBottom>
                {type}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Téléphone:</strong> {telephone}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Date de naissance:</strong>{" "}
                {new Date(date_de_naissance)?.toLocaleDateString("fr-FR")}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Sexe:</strong> {sexe}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Date d'inscription:</strong>{" "}
                {new Date(date_inscription)?.toLocaleDateString("fr-FR")}
              </Typography>
              {user?.Artisan && (
                <>
                  <Typography variant="body1" gutterBottom>
                    <strong>Description:</strong> {user?.Artisan?.description}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    <strong>Année début d'expérience:</strong>{" "}
                    {user?.Artisan?.annee_debut_experience}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    <strong>Spécialité:</strong> {user?.Artisan?.specialite}
                  </Typography>
                </>
              )}
              {user?.Fournisseur && (
                <>
                  <Typography variant="body1" gutterBottom>
                    <strong>Raison social:</strong>{" "}
                    {user?.Fournisseur?.raison_social}
                  </Typography>
                </>
              )}

              {(user?.Artisan || user?.Fournisseur) && (
                <>
                  <Typography variant="body1" gutterBottom>
                    <strong>Statut compte:</strong>{" "}
                  </Typography>
                  <Typography
                    variant="h3"
                    style={{
                      display: "inline",
                      color: user?.Artisan?.statutCompte ? `green` : `red`,
                    }}
                  >
                    {user?.Artisan?.statutCompte ||
                    user?.Fournisseur?.statutCompte
                      ? `Actif`
                      : `Inactif`}
                  </Typography>
                  {(user?.Artisan?.document || user?.Fournisseur?.document) && (
                    <Typography variant="body1" gutterBottom>
                      <strong>Document:</strong>
                      <img
                        style={{ display: "block" }}
                        src={user?.Artisan?.document}
                        alt="ID"
                      />
                    </Typography>
                  )}
                </>
              )}
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{ mt: 5, color: colors.redAccent[500] }}
            onClick={() => deleteUser(user?.id_utilisateur)}
          >
            Supprimer
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default UserCard;
