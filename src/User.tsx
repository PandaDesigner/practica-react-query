

export const User = ({ user }) => {

    return (
        <>
            <li>
                {`${user.first_name} ${user.last_name}: `}
                <span className='text_span__color'>{user.email}</span>
            </li>
        </>
    );

};