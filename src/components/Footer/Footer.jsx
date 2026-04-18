import Link from "next/link";
import styles from "./styles.module.scss";
export default function Footer() {
    return (
        <>
            			<footer className={styles.footer}>
				<div className={styles.footerText}>Арена развлечений</div>
				<div className={styles.footerSocial}>
					{/* <a
						className={styles.socialIcon}
						href='https://t.me'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img src='/images/socials/logos_telegram.png' alt='telegram' />
					</a> */}
					<a
						className={styles.socialIcon}
						href='https://max.ru/u/f9LHodD0cOJaFVvW9nUbeGO6KyU4YV4ECO1_CYWK8Iel22tTaDmxsz4THJA'
						target='_blank'
						rel='noopener noreferrer'
					>
						<div className='w-10 h-10 bg-[#004530] rounded-full flex items-center justify-center'>
							<img src='/images/socials/logos-max.png' alt='max' />
						</div>
					</a>
					<a
						className={styles.socialIcon}
						href='https://vk.com/animatori_tomsk'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img src='/images/socials/logos-vk.png' alt='vk' />
					</a>
				</div>
			</footer>
        </>
    )
}