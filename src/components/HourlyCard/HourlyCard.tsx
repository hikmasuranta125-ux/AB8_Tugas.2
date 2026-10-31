import { formatHari, formatJam, formatSuhu, formatTanggalSingkat } from '../../utils/format';
import './HourlyCard.css';

interface PropertiKartuPerJam {
  waktu: string;
  suhu: number;
  aktif?: boolean;
}

const HourlyCard: React.FC<PropertiKartuPerJam> = ({ waktu, suhu, aktif = false }) => (
  <article className={aktif ? 'kartu-jam kartu-jam--aktif' : 'kartu-jam'}>
    <span className="kartu-jam__hari">{formatHari(waktu)}</span>
    <span className="kartu-jam__tanggal">{formatTanggalSingkat(waktu)}</span>
    <strong className="kartu-jam__suhu">{formatSuhu(suhu)}</strong>
    <span className="kartu-jam__jam">{formatJam(waktu)}</span>
  </article>
);

export default HourlyCard;
