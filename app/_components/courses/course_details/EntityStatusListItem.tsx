import Avatar from "@/app/_components/Avatar"
import List from "@/app/_components/List"


interface EntityStatusListItemProps {
    /**Avatar for the user */
    Avatar: React.ReactElement<typeof Avatar>,

    /**user name */
    name: string,

    /**can be any description for the user
     * 
     * such as assign date, unassign date, or if studnet then can show grade.
     */
    Description: React.ReactNode,

    /**can show a action button, such as assign or enroll ..... */
    ActionButton?: React.ReactNode
}


/**This component shows a item list that represent a teacher or student data. 
 * 
 * each items consist of: Avatar
 * 
 * User name, under it can be any description for instance: assign date, unassign date. or student grade
 * 
 * and at the end a action button to do operations such as assign teacher, enroll student ....
 */
const EntityStatusListItem: React.FC<EntityStatusListItemProps> = ({
    Avatar,
    name,
    Description,
    ActionButton
}) => {


    return (
        <List.ListItem
            className="flex justify-between items-center 
                                gap-0.5 lg:gap-2
                                py-2 
                                px-2 lg:px-4"
        >
            <div className="flex items-center gap-2.5">
                {/**Avatar */}
                {Avatar}

                {/**name + description */}
                <div className="flex flex-col gap-0">
                    <span>{name}</span>

                    {/**description */}
                    <div className="flex items-center gap-1.5
                     text-[var(--color-grey-500)]
                     h-6 min-h-6">
                        {Description}
                    </div>
                </div>
            </div>

            {/**action button */}
            {ActionButton}
        </List.ListItem>
    )

}

export default EntityStatusListItem