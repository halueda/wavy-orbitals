
export default class WaveFunction {
    /* ����͈�Ԓ��ۓI�ȃN���X�B���[�e�B���e�B�֐����܂� */
    /* ������ point �� {x: num, y: num, z: num} �`���B�ړ��̃��C�u�������g���������� */
    /* ���ʂ̕��f���� */
    sampling (n, seed=null) {
	/* n�� WaveFragment �����o�� */
	/* seed �� null �łȂ���Η����������� */
	/* from ����̑��������K���z�� to����� */
	/* if this.probability(to)/this.probability(from) > rand() �Ȃ�̗p���� from ��ύX */
	/*   if �o�[���C�����łȂ���� */
	/*      �̗p�������̂� new WaveFragment( from.x, from.y, from.z, this.theta(), this.angular_velocity(), this) ���Č��ʂɓ���� */
	/*      �̗p�J�E���^ ++ �ŏ\���Ȃ�return */
	/* �o�[���C���J�E���^ ++ */
    }
    probability ( point_or_wavevalue ) {
	/* this.waveValue �� ���o�� */
	/* 2�悵�Ċm���ɂ��� return */
    }
    theta( point_or_wavevalue ) {
	/* this.waveValue �� ���o�� */
	/* atan() �� theta�����߂� return */
    }
    angular_velocity( point_or_wavevalue ) {
	/* this.energy �� ���o�� */
	/* ���ɂ傲�ɂ�v�Z���� return */
    }
    energy( ) {
	error("need to ����");
    }
    waveValue( point ) {
	error("need to ����");
    }
}
